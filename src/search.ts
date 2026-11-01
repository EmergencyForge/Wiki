// Search setup for the header search (src/components/Search.astro), kept apart so it can be tested in Node.
import MiniSearch, { type Options, type SearchResult } from 'minisearch';
export interface SearchDoc {
	id: string;
	type: 'page' | 'ref';
	url: string;
	section: string;
	title: string;
	page?: string;
	heading?: string;
	description?: string;
	text?: string;
	code?: string;
	params?: string;
	kind?: 'export' | 'event';
	realm?: 'client' | 'server' | 'shared';
	category?: string;
}

const WORD = /[\p{L}\p{N}_]+/gu;

// Umlauts folded so "menue" finds "Menü".
export const fold = (s: string) =>
	s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

// Indexed words also yield their camelCase and snake_case parts, so "notif" finds SendNotification.
export function indexTokens(s: string) {
	const out: string[] = [];
	for (const word of s.match(WORD) ?? []) {
		out.push(word);
		const parts = word.split(/_|(?<=[a-z0-9])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).filter(Boolean);
		if (parts.length > 1) out.push(...parts);
	}
	return out;
}

const queryTokens = (s: string) => s.match(WORD) ?? [];

const fields = ['title', 'heading', 'params', 'description', 'category', 'page', 'text', 'code'];

export function createIndex(docs: SearchDoc[]) {
	// Folded term back to its first spelling in the docs, for readable suggestions.
	const surface = new Map<string, string>();
	const options: Options<SearchDoc> = {
		fields,
		storeFields: ['kind'],
		tokenize: indexTokens,
		processTerm: (term) => {
			const t = fold(term);
			if (!surface.has(t)) surface.set(t, term);
			return t;
		},
		searchOptions: {
			tokenize: queryTokens,
			processTerm: fold,
			boost: { title: 6, heading: 3, params: 2, description: 2, category: 1.5, page: 1, text: 1, code: 0.4 },
			prefix: (term) => term.length >= 2,
			// Short words would match half the index with one edit.
			fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
			combineWith: 'AND',
			// Event entries repeat the export's name and the docs recommend the export.
			boostDocument: (_id, _term, stored) => (stored?.kind === 'event' ? 0.5 : 1),
		},
	};
	const ms = new MiniSearch<SearchDoc>(options);
	ms.addAll(docs);
	const byId = new Map(docs.map((d) => [d.id, d]));
	return { ms, byId, surface };
}

export type Index = ReturnType<typeof createIndex>;

export interface Hit {
	doc: SearchDoc;
	result: SearchResult;
}

export function search({ ms, byId, surface }: Index, query: string) {
	let results = ms.search(query);
	let loose = false;
	if (!results.length) {
		results = ms.search(query, { combineWith: 'OR' });
		loose = true;
	}
	// Drops the long tail so a strong guide hit is not buried under weak reference matches.
	const floor = (results[0]?.score ?? 0) * 0.2;
	const hits: Hit[] = results
		.filter((r) => r.score >= floor)
		.map((result) => ({ doc: byId.get(result.id)!, result }));

	// Weak means no exact or prefix match for some query word in the best hit.
	const top = results[0];
	const words = queryTokens(query).map(fold);
	const weak = loose || !top || words.some((w) => !top.terms.some((t) => t.startsWith(w)));
	let suggestions: string[] = [];
	if (weak) {
		const q = words.join(' ');
		suggestions = ms
			.autoSuggest(query, { fuzzy: 0.25, prefix: false, combineWith: 'AND' })
			.map((s) => s.terms.map((t) => surface.get(t) ?? t).join(' '))
			.filter((s, i, all) => fold(s) !== q && all.indexOf(s) === i)
			.slice(0, 3);
	}
	return { hits, suggestions };
}
