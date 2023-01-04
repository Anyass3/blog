import { error, redirect } from '@sveltejs/kit';
import store from '$lib/store';
import * as E from '@anyass3/encryption';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const token = store.state.token.get();
	const publicKey = store.state.publicKey.get();
	if (!token || !publicKey) throw redirect(303, '/');
	const encryptedToken = E.encrypt(token, publicKey);
	return {
		encryptedToken
	};
};
