import { MM_PUBLIC_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";
import * as E from '@anyass3/encryption';
import { authSession } from "$lib/session";


export const POST: RequestHandler = async ({ cookies, request, locals }) => {
    const action = request.headers.get('x-action');
    const sesssionCookie = cookies.get('session')!
    if (action == 'login' && MM_PUBLIC_KEY) {
        locals.keyPair = E.keyPair(false);
        locals.signKeyPair = E.keyPair(true);
        locals.token = E.random();
        locals.signedToken = E.sign(
            locals.token,
            locals.signKeyPair.signSecretKeyHex
        );
        locals.encryptedToken = await E.encrypt(
            locals.token,
            locals.keyPair.publicKeyHex
        );
        const data = `${locals.signKeyPair.signPublicKeyHex}::${locals.keyPair.publicKeyHex}::${locals.signedToken}`;
        locals.encryptedData = await E.encrypt(
            data,
            Buffer.from(MM_PUBLIC_KEY, 'base64').toString('hex')
        );
        locals.expires = Date.now() + 24 * 3.6e6; // expires in 24 hours
        authSession.set(sesssionCookie, locals);

        return new Response(JSON.stringify({ success: true, encryptedData: locals.encryptedData }));
    }

    if (action == 'logout') {
        authSession.delete(sesssionCookie);
    }

    return new Response(JSON.stringify({ success: true }))
}