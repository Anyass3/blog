import * as db from '$lib/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const blogs = await db.state();

	return {
		blogs
	};
};
