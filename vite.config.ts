import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale'],
			routeStrategies: [
				{ match: '/_app/:path(.*)?', exclude: true },
				{ match: '/favicon:path(.*)?', exclude: true },
				{ match: '/robots.txt', exclude: true },
				{ match: '/manifest.webmanifest', exclude: true },
				{ match: '/site.webmanifest', exclude: true },
				{ match: '/sitemap.xml', exclude: true },
				{ match: '/:path(.*).:ext(avif|bmp|css|gif|ico|jpeg|jpg|js|json|map|mp4|png|svg|txt|webm|webp|woff|woff2|xml)', exclude: true }
			]
		})
	]
});
