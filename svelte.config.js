import { resolve } from 'path';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess({
		postcss: true
	}),

	kit: {
		alias: {
			$store: resolve('src/store'),
			$icons: resolve('node_modules/svelte-feather-icons/src/icons')
		},
		adapter: adapter({ precommpress: true, out: 'dmt-hook' })
	}
};

export default config;
