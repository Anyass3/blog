import { redirect } from '@sveltejs/kit';
import store from '$lib/store';
import * as E from '@anyass3/encryption';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { base } from '$app/paths';

export const load: PageLoad = async ({ parent }) => {
	const { isAuthenticated } = await parent();
	if (!isAuthenticated) throw redirect(303, base + '/');
	return {
		// 
	};
};
