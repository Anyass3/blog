import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	server: {
		host: true,
		port: 4100,
		strictPort: true
	}
};

export default config;