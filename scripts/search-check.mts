// Ranking check for the docs search against the built index. Run `npm run build` first, then `npm run check:search`.
import { readFileSync } from 'node:fs';
import { createIndex, search } from '../src/search.ts';

const docs = JSON.parse(readFileSync(new URL('../dist/search-index.json', import.meta.url), 'utf8'));
const idx = createIndex(docs);

// Typos and partial words the search has to forgive, and where the first hit must lead.
const cases: [string, (url: string) => boolean][] = [
	['OpnMenu', (u) => u.endsWith('#openmenu')],
	['Fortschirtt', (u) => u.startsWith('/ef-lib/fortschritt/')],
	['lockpik', (u) => u.includes('#minigame') || u.startsWith('/ef-lib/minispiele/')],
	['notif', (u) => u.includes('#sendnotification')],
	['benachrichtigung', (u) => u.startsWith('/ef-lib/meldungen/')],
];

let fail = 0;
for (const [q, ok] of cases) {
	const { hits } = search(idx, q);
	// The dialog lists reference hits before guide pages.
	const first = (hits.find((h) => h.doc.type === 'ref') ?? hits[0])?.doc.url ?? '';
	const pass = ok(first);
	if (!pass) fail++;
	console.log(`${pass ? 'ok  ' : 'FAIL'} ${q} -> ${first}`);
}
process.exit(fail ? 1 : 0);
