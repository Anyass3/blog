import * as db from '$lib/db';
import { render } from 'svelte/server';
import type { Actions } from './$types';
import { sendEmail } from '$lib/email/sender';
import WelcomeEmail from '$lib/email/welcome.svelte';

export const actions: Actions = {
	subscribe: async ({ request }) => {
		const formData = await request.formData();

		const data = {} as db.Subscriber;

		for (const key of formData.keys() as IterableIterator<keyof db.Subscriber>) {
			data[key] = String(formData.get(key) || "");
		}

		console.log('Subscriber', data);

		db.saveSubscriber(data);

		const { body } = await render(
			WelcomeEmail,
			{
				props: {
					firstName: data.name
				}
			}
		);

		sendEmail(data.email, 'Welcome to Abu\'s blog', body)

		return { success: "Thanks for subscribing!" };
	}
};
