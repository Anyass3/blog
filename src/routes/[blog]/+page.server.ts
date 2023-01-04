import * as db from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const pathname = url.pathname.split('/').at(-1)?.match(/[\w-]+/)?.[0] ?? '';
	// console.log(url.pathname);
	let body = await db.get(pathname);
	if (!body) throw error(404, "Sorry! Blog does't exist.");

	return body;
};
