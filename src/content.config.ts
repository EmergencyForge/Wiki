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
// `id` doubles as the URL anchor on /referenz/<resource>/.
export const referenceResources = ['ef-lib'] as const;

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	...Object.fromEntries(
		referenceResources.map((r) => [
			`reference-${r}`,
			defineCollection({ loader: file(`src/data/reference/${r}.yaml`), schema: reference }),
		]),
	),
};
