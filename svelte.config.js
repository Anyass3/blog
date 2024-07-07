import { resolve } from 'path';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		postcss: true
	}),

	kit: {
	csrf: { checkOrigin: false },
		alias: {
			$store: resolve('src/store'),
			$icons: resolve('node_modules/svelte-feather-icons/src/icons')
		},
		adapter: adapter({ precommpress: true, out: 'build' })
	}
};

export default config;
