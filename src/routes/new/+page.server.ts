import * as db from '$lib/db';
import type { Actions } from './$types';
import * as E from '@anyass3/encryption';
import { error } from '@sveltejs/kit';
import { sendEmail } from '$lib/email/sender';
import WelcomeEmail from '$lib/email/welcome.svelte';
import { render } from 'svelte/server';


export const actions: Actions = {
	publish: async ({ request, locals, url }) => {
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

		sendEmails(data, pathname, url.origin);

		return { pathname };
	}
};


const sendEmails = async (data: db.PutOpts, pathname, base: string) => {

	const subscribers = await db.getSubscribers();
	const coverUrl = data.cover ? `${base}/file/${data.cover}` : undefined
	// const coverFullUrl = data.cover ? new URL(data.cover, base).href : undefined;

	for (const subscriber of subscribers) {
		const { body } = await render(
			WelcomeEmail,
			{
				props: {
					firstName: subscriber.name,
					newBlogTitle: data.title,
					blogUrl: `${base}${pathname}`,
					imgSrc: coverUrl
				}
			}
		);

		sendEmail(subscriber.email, data.title, body)
	}
}