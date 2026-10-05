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
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/EmergencyForge' },
				{ icon: 'discord', label: 'Discord', href: 'https://emfor.ge/discord' },
			],
			editLink: { baseUrl: 'https://github.com/EmergencyForge/Wiki/edit/main/' },
			sidebar: [
				{ label: 'ignis', items: [{ autogenerate: { directory: 'ignis' } }] },
				{ label: 'ignisTab', items: [{ autogenerate: { directory: 'ignistab' } }] },
				{ label: 'Mitmachen', items: [{ autogenerate: { directory: 'mitmachen' } }] },
			],
		}),
	],
});
