import { authSession } from '$lib/session';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
	return {
		isAuthenticated: !!authSession.has(cookies.get('session') as string)
	};
};
