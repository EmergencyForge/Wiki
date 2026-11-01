import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { StarlightRouteData } from '@astrojs/starlight/route-data';
import { currentSection } from './sections';

type Entry = StarlightRouteData['sidebar'][number];

// The sidebar only lists the area the page belongs to; the header tabs switch areas.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const section = currentSection(context.url.pathname);
	if (!section) return;
	const inSection = (e: Entry): boolean =>
		e.type === 'link' ? e.href.startsWith(section.prefix) : e.entries.some(inSection);
	route.sidebar = route.sidebar.filter(inSection);
});
