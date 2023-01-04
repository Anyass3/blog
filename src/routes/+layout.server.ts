import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ locals }) => {
	return {
		encryptedData: locals.encryptedData
	};
};
