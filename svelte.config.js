import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			edge: false, // Use Node.js functions (not Edge)
			split: true  // CRITICAL: Separate function per route for faster cold starts
		}),
		// For future subfolder deployment under japanccc.org/hris/
		paths: {
			base: process.env.BASE_PATH || ''
		}
	}
};

export default config;
