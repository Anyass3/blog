import { resolve } from 'path';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		postcss: true
	}),

	kit: {
		paths: {
			base: '/blog'
		},
		csrf: { checkOrigin: false },
		alias: {
			$store: resolve('src/store'),
			$icons: resolve('node_modules/svelte-feather-icons/src/icons')
		},
		adapter: adapter({ precommpress: true, out: 'dmt-hook' })
	}
};

export default config;
