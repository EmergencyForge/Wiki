// Top-level areas shown as tabs in the header. Each one maps to a folder in src/content/docs.
export const sections = [
	{ label: 'ignis', href: '/ignis/', prefix: '/ignis/' },
	{ label: 'ef_bridge', href: '/ef-bridge/', prefix: '/ef-bridge/' },
	{ label: 'ef_lib', href: '/ef-lib/', prefix: '/ef-lib/' },
	{ label: 'Referenz', href: '/referenz/', prefix: '/referenz/' },
	{ label: 'Mitmachen', href: '/mitmachen/beitragen/', prefix: '/mitmachen/' },
];

export const currentSection = (pathname: string) => sections.find((s) => pathname.startsWith(s.prefix));
