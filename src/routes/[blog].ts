import * as db from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
import { resolve } from 'path';
import fs from 'fs';

export async function get(event: RequestEvent) {
	const blogs = await db.state();
	const content = fs.readFileSync(resolve('TRY_DMT_SEARCH.md'), 'utf-8');
	const pathname = event.url.pathname.match(/[\w-]+/)[0];
	let body = (await db.get(pathname)) || {
		title: 'TRY_DMT_SEARCH',
		content
	};
	console.log(pathname, event.url.pathname, body);

	return {
		body
	};
}
