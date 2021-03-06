import { resolve } from 'path';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
	adapter: adapter({ precommpress: true, out: 'dmt-hook' })
	},
	vite: {
		resolve: {
			alias: {
				$store: resolve('src/store')
			}
		}
	}
};

export default config;
