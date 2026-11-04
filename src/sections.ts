// Top-level areas, one per sidebar group. The label heads a page and its search results.
export const sections = [
	{ label: 'ignis', prefix: '/ignis/' },
	{ label: 'ef_bridge', prefix: '/ef-bridge/' },
	{ label: 'ef_lib', prefix: '/ef-lib/' },
	{ label: 'Referenz', prefix: '/referenz/' },
	{ label: 'Mitmachen', prefix: '/mitmachen/' },
];

export const currentSection = (pathname: string) => sections.find((s) => pathname.startsWith(s.prefix));
