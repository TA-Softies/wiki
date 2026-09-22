// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://wiki.tasw.qzz.io',
	integrations: [
		starlight({
			title: 'TA Software FU Wiki',
			description: 'Documentation hub for the APU Technical Assistant Software Functional Unit.',
			logo: {
				src: './src/assets/logo.png',
				replacesTitle: false,
			},
			favicon: '/favicon.ico',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/TA-Softies/wiki' },
			],
			editLink: {
				baseUrl: 'https://github.com/TA-Softies/wiki/edit/main/',
			},
			lastUpdated: true,
			pagination: false,
			components: {
				Footer: './src/components/Footer.astro',
			},
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'macOS Guides',
					items: [{ autogenerate: { directory: 'macos' } }],
				},
				{
					label: 'Windows & Lab Systems',
					items: [{ autogenerate: { directory: 'windows' } }],
				},
				{
					label: 'Software FU Procedures',
					items: [{ autogenerate: { directory: 'software-fu' } }],
				},
			],
		}),
	],
});
