import { redirect } from '@sveltejs/kit';
import store from '$lib/store';
import * as E from '@anyass3/encryption';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ parent }) => {
	const { isAuthenticated } = await parent();
	const token = store.state.token.get();
	const publicKey = store.state.publicKey.get();
	if (!isAuthenticated || !token || !publicKey) throw redirect(303, '/');
	const encryptedDummy = browser ? E.encrypt(E.random(), publicKey) : '';
	return {
		encryptedDummy
	};
};
