import * as db from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as E from '@anyass3/encryption';

export const POST: RequestHandler = async ({ request, locals }) => {
	console.log('uplaoding...');

	try {
		const encrytedDummy = request.headers.get('x-encrypted-dummy');
		console.log({ encrytedDummy });
		if (!encrytedDummy) {
			throw error(403, {
				message: 'Cannot Upload'
			});
		}
		const dummy = await E.decrypt(encrytedDummy, locals.keyPair.privateKeyHex);
		console.log({ dummy });
	} catch (_error) {
		console.log({ _error });

		throw error(403, {
			message: 'Cannot Upload'
		});
	}

	const formData = await request.formData();
	const file = formData.get('file') as Blob;
	console.log({ file });
	if (!file) {
		throw error(400, {
			message: 'Cannot Upload empty file'
		});
	}
	try {
		const { pathname } = await db.saveFile(file);
		console.log({ pathname });
		const _file = await db.getFile(pathname);
		console.log(_file);
		return new Response(JSON.stringify({ pathname }));
	} catch (_error) {
		console.log({ _error });
		throw error(400, {
			message: 'Cannot Upload'
		});
	}
};
