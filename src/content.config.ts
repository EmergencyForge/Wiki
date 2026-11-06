import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const value = z.object({
	name: z.string(),
	type: z.string(),
	optional: z.boolean().default(false),
	description: z.string().optional(),
});

const reference = z.object({
	name: z.string(),
	kind: z.enum(['export', 'event']),
	// Where the code runs; for events the side the event arrives on.
	realm: z.enum(['client', 'server', 'shared']),
	usage: z.enum(['listen', 'trigger']).optional(),
	category: z.string(),
	description: z.string(),
	params: z.array(value).default([]),
	returns: z.array(value.omit({ name: true, optional: true }).extend({ name: z.string().optional() })).default([]),
	example: z.string().optional(),
	guide: z.string().optional(),
});

// One YAML file per resource in src/data/reference/, one entry per export or event.
// `id` doubles as the URL anchor on /referenz/<resource>/. Categories are listed in page order;
// their labels become the headings and the table of contents of the reference page.
export const referenceResources: Record<string, { categories: Record<string, string> }> = {
	'ef-lib': {
		categories: {
			callbacks: 'Callbacks',
			menu: 'Menü',
			context: 'Context Menu',
			dialog: 'Dialoge',
			notify: 'Meldungen und Hinweise',
			progress: 'Fortschritt',
			minigame: 'Minispiele',
			zone: 'Zonen',
			util: 'Hilfsfunktionen',
		},
	},
	'ef-target': {
		categories: {
			point: 'Punkte',
			entity: 'Entities',
			zone: 'Zonen',
			control: 'Steuerung',
		},
	},
	'ef-fraktionsgarage': {
		categories: {
			server: 'Server',
			client: 'Client',
			events: 'Events',
		},
	},
};

// Same result as Starlight's heading slugs for these labels, so links like #menü keep working.
export const categorySlug = (label: string) => label.toLowerCase().replace(/\s+/g, '-');

// getCollection returns entries sorted by id; the page and its table of contents list exports first, then events.
export const byKindAndName = (a: any, b: any) =>
	a.data.kind.localeCompare(b.data.kind) || a.data.name.localeCompare(b.data.name);

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	...Object.fromEntries(
		Object.keys(referenceResources).map((r) => [
			`reference-${r}`,
			defineCollection({ loader: file(`src/data/reference/${r}.yaml`), schema: reference }),
		]),
	),
};
