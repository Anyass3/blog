import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load: PageLoad = async ({ parent }) => {
	const { isAuthenticated } = await parent();
	if (!isAuthenticated) throw redirect(303, base + '/');
	return {
		// 
	};
};
