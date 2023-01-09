import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { authSession, clearAuthSession } from '$lib/session';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const session = cookies.session ?? uuid();
	const locals = authSession.get(session);

	if (locals) clearAuthSession(session);

	Object.assign(event.locals, locals||{})

	// console.log('resolving... event');
	const response = await resolve(event);
	// console.log('resolved event');
	// console.log('headers',Array.from(event.request.headers.entries()))

	if (!cookies.session) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.append(
			'set-cookie',
			cookie.serialize('session', session ?? '', {
				path: '/',
				httpOnly: true
			})
		);
	}
	return response;
};
