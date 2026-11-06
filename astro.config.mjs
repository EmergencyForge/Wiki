// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.emergencyforge.de',
	integrations: [
		starlight({
			title: 'EmergencyForge Docs',
			defaultLocale: 'root',
			locales: { root: { label: 'Deutsch', lang: 'de' } },
			logo: { src: './src/assets/logo.webp', replacesTitle: true },
			favicon: '/favicon.png',
			customCss: ['./src/styles/theme.css'],
			pagefind: false,
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/EmergencyForge' },
				{ icon: 'discord', label: 'Discord', href: 'https://emfor.ge/discord' },
			],
			editLink: { baseUrl: 'https://github.com/EmergencyForge/Wiki/edit/main/' },
			components: {
				Header: './src/components/Header.astro',
				Hero: './src/components/Hero.astro',
				Sidebar: './src/components/Sidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
				TableOfContents: './src/components/TableOfContents.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				Search: './src/components/Search.astro',
			},
			routeMiddleware: './src/routeData.ts',
			// A group's folder also picks its icon in theme.css and its label in src/sections.ts.
			sidebar: [
				{ label: 'ignis', items: [{ autogenerate: { directory: 'ignis' } }] },
				{ label: 'ef_bridge', items: [{ autogenerate: { directory: 'ef-bridge' } }] },
				{ label: 'ef_lib', items: [{ autogenerate: { directory: 'ef-lib' } }] },
				{ label: 'ef_target', items: [{ autogenerate: { directory: 'ef-target' } }] },
				{ label: 'ef_fraktionsgarage', items: [{ autogenerate: { directory: 'ef-fraktionsgarage' } }] },
				{ label: 'Referenz', items: [{ autogenerate: { directory: 'referenz' } }] },
				{ label: 'Mitmachen', items: [{ autogenerate: { directory: 'mitmachen' } }] },
			],
		}),
	],
});
