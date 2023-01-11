import * as db from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	console.log('getting file...');

	try {
		const pathname = params.pathname;
		const { value } = await db.getFile(pathname);
		console.log(value);
		return new Response(value);
	} catch (_error) {
		console.log({ _error });
		throw error(404, {
			message: 'Hmm, it seems image does not exist'
		});
	}
};
