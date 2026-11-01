import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';
import { referenceResources } from '../content.config';
import { currentSection } from '../sections';
import type { SearchDoc } from '../search';


const CODE_LIMIT = 800;

// Markdown inline syntax to plain text; also used for reference descriptions.
const inline = (s: string) =>
	s
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/(\*\*|__)(.+?)\1/g, '$2')
		.replace(/(^|\W)[*_](\S.*?)[*_](?=\W|$)/g, '$1$2');

function clean(md: string) {
	const code: string[] = [];
	const text = md
		.replace(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*?)^\1\s*$/gm, (_, _f, body) => {
			code.push(body);
			return '\n';
		})
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/^(import|export)\s.*$/gm, '')
		.replace(/<\/?[A-Za-z][^>]*>/g, ' ')
		.replace(/^:::\w*(\[([^\]]*)\])?.*$/gm, '$2')
		.replace(/^#{4,6}\s+/gm, '')
		.replace(/^\s*\|?[\s:|-]+\|[\s:|-]*$/gm, '')
		.replace(/\|/g, ' ')
		.replace(/^\s*([-*+]|\d+\.)\s+/gm, '')
		.replace(/^>\s?/gm, '');
	return {
		text: inline(text).replace(/\s+/g, ' ').trim(),
		code: code.join(' ').replace(/\s+/g, ' ').trim().slice(0, CODE_LIMIT),
	};
}

// Splits the body at ## and ### outside code fences, in source order.
function split(body: string) {
	const parts: { heading?: string; body: string }[] = [{ body: '' }];
	let fence: string | null = null;
	for (const line of body.split('\n')) {
		const f = line.match(/^(`{3,}|~{3,})/);
		if (f) fence = fence === null ? f[1] : line.startsWith(fence) ? null : fence;
		const h = fence === null && line.match(/^#{2,3}\s+(.+?)\s*#*\s*$/);
		if (h) parts.push({ heading: inline(h[1]), body: '' });
		else parts[parts.length - 1].body += line + '\n';
	}
	return parts;
}

const sectionOf = (url: string) => currentSection(url)?.label ?? '';

export const GET: APIRoute = async () => {
	const docs: SearchDoc[] = [];

	for (const entry of await getCollection('docs')) {
		if (entry.id === 'index' || entry.id === '404') continue;
		const url = `/${entry.id}/`;
		const section = sectionOf(url);
		const title = entry.data.title;
		// Slugs come from the rendered page so anchors match Starlight exactly.
		const { headings } = await render(entry);
		const slugs = headings.filter((h) => h.depth === 2 || h.depth === 3);
		const parts = split(entry.body ?? '');
		if (slugs.length !== parts.length - 1) {
			throw new Error(`search-index: ${entry.id} has ${parts.length - 1} headings in source, ${slugs.length} rendered`);
		}

		parts.forEach((part, i) => {
			const { text, code } = clean(part.body);
			if (i === 0) {
				docs.push({ id: url, type: 'page', url, section, title, page: title, description: entry.data.description, text, code });
			} else if (text || code) {
				const slug = slugs[i - 1].slug;
				// Page title stays out of `title` so sections do not all rank like the page itself.
				docs.push({ id: `${url}#${slug}`, type: 'page', url: `${url}#${slug}`, section, title: '', page: title, heading: part.heading, text, code });
			}
		});
	}

	for (const [resource, { categories }] of Object.entries(referenceResources)) {
		const url = `/referenz/${resource}/`;
		for (const { id, data: d } of await getCollection(`reference-${resource}` as any) as any[]) {
			docs.push({
				id: `${url}#${id}`,
				type: 'ref',
				url: `${url}#${id}`,
				section: sectionOf(url),
				title: d.name,
				description: inline(d.description).replace(/\s+/g, ' ').trim(),
				params: d.params.map((p: any) => p.name).join(', '),
				text: [...d.params, ...d.returns].map((p: any) => inline(p.description ?? '')).join(' ').replace(/\s+/g, ' ').trim(),
				kind: d.kind,
				realm: d.realm,
				category: categories[d.category] ?? d.category,
			});
		}
	}

	return new Response(JSON.stringify(docs), { headers: { 'Content-Type': 'application/json' } });
};
