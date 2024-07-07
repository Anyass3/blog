import { authSession } from '$lib/session';
import type { ServerLoad } from '@sveltejs/kit';
import * as ENV from "$env/static/private"

export const load: ServerLoad = ({ cookies }) => {
	return {
		isAuthenticated: !!authSession.has(cookies.get('session') as string),
		hasPublicKey: !!ENV.MM_PUBLIC_KEY
	};
};
