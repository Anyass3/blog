import * as db from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
import { resolve } from 'path';
import fs from 'fs';

export async function get(event: RequestEvent) {
	const pathname = event.url.pathname.match(/[\w-]+/)[0];
	console.log(event.url.pathname);
	let body = await db.get(pathname);
	if (!body)
		return {
			status: 404,
			error: new Error("Sorry! Blog does't exist.")
		};

	return {
		body
	};
}
