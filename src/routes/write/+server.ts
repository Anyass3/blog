import * as db from '$lib/db';
import type { RequestHandler } from './$types';
import * as E from '@anyass3/encryption';
import { error } from '@sveltejs/kit';
const noop = () => { }
export const POST: RequestHandler = async ({ request, locals }) => {
	const encryptedToken = request.headers.get('x-encrypted-token')
	console.log({ encryptedToken });
	const token = encryptedToken ? await E.decrypt(encryptedToken, locals.keyPair.privateKeyHex).catch(noop) : undefined;

	console.log({ token, localToken: locals.token })
	if (token !== locals.token) {
		throw error(403, {
			message: 'Not authenticated'
		});
	}
	const data = await request.json();
	console.log(data);
	const pathname = await db.put(data.title, data.content);
	return new Response(JSON.stringify({ pathname }));
}
