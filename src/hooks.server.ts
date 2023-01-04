import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import * as E from '@anyass3/encryption';
import { MM_PUBLIC_KEY } from '$env/static/private';

const authSession = new Map<string, App.Locals>();

const clearAuthSession = async (token: string) => {
	if (Date.now() >= (authSession.get(token)?.expires ?? 0)) {
		authSession.delete(token);
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const session = cookies.session ?? uuid();
	const locals = authSession.get(cookies.token);

	if (event.request.method != 'POST' && MM_PUBLIC_KEY && !locals) {
		event.locals.keyPair = E.keyPair(false);
		event.locals.signKeyPair = E.keyPair(true);
		event.locals.token = E.random();
		event.locals.signedToken = E.sign(
			event.locals.token,
			event.locals.signKeyPair.signSecretKeyHex
		);
		event.locals.encryptedToken = await E.encrypt(
			event.locals.token,
			event.locals.keyPair.publicKeyHex
		);
		const data = `${event.locals.signKeyPair.signPublicKeyHex}::${event.locals.keyPair.publicKeyHex}::${event.locals.signedToken}`;
		event.locals.encryptedData = await E.encrypt(
			data,
			Buffer.from(MM_PUBLIC_KEY, 'base64').toString('hex')
		);
		event.locals.expires = Date.now() + 24 * 3.6e6; // expires in 24 hours
	} else {
		event.locals = (locals ?? { keyPair: {}, signKeyPair: {} }) as App.Locals;
	}
	console.log('hook', { href: event.url.href, isDataRequest: event.isDataRequest });
	// console.log('headers',Array.from(event.request.headers.entries()))

	const response = await resolve(event);

	if (!session) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.append(
			'set-cookie',
			cookie.serialize('session', session, {
				path: '/',
				httpOnly: true
			})
		);
	}
	if (!cookies.token) {
		response.headers.append(
			'set-cookie',
			cookie.serialize('token', event.locals.encryptedToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				expires: new Date(event.locals.expires)
			})
		);

		authSession.set(event.locals.encryptedToken, event.locals);
	} else clearAuthSession(cookies.token);
	return response;
};
