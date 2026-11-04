import { getCollection } from 'astro:content';
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { byKindAndName, categorySlug, referenceResources } from './content.config';

export const onRequest = defineRouteMiddleware(async (context) => {
	const route = context.locals.starlightRoute;

	// Reference headings are rendered by a component, so the table of contents is built from the data:
	// one item per category, its exports and events as collapsed children.
	const resource = context.url.pathname.match(/^\/referenz\/([^/]+)\/$/)?.[1];
	if (resource && referenceResources[resource] && route.toc) {
		const entries = (await getCollection(`reference-${resource}` as any)) as any[];
		route.toc.items = [
			route.toc.items[0],
			...Object.entries(referenceResources[resource].categories).map(([id, label]) => ({
				depth: 2,
				slug: categorySlug(label),
				text: label,
				children: entries
					.filter((e) => e.data.category === id)
					.sort(byKindAndName)
					.map((e) => ({ depth: 3, slug: e.id, text: e.data.name, children: [] })),
			})),
		];
	}
});
