import * as db from '$lib/db';
import type { Actions } from './$types';
import * as E from '@anyass3/encryption';
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	publish: async ({ request, locals }) => {
		const formData = await request.formData();

		const data = {} as db.PutOpts;
		try {
			for (const key of formData.keys() as IterableIterator<keyof db.PutOpts>) {
				const value = await E.decrypt(formData.get(key) as string, locals.keyPair.privateKeyHex);
				data[key] = value;
			}
		} catch (_error) {
			throw error(403, {
				message: 'Not authenticated'
			});
		}
		console.log('formData', data);

		const pathname = await db.put(data);
		return { pathname };
	}
};
