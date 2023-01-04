import { HOME } from '$env/static/private';
import Hyperbee from 'hyperbee';
import Hypercore from 'hypercore';
import path from 'path';
import { dev, building } from '$app/environment';
import RAM from 'random-access-memory';

const makeRam = (filename) => {
	// filename will be one of: data, bitfield, tree, signatures, key, secret_key
	// the data file will contain all your data concatenated.

	// just store all files in ram by returning a random-access-memory instance
	return new RAM();
};
const core = new Hypercore((building || dev) ? makeRam : path.join(HOME, '/.dmt-here/.db'));

core.ready().then(() => {
	console.log({ dbKey: core.key });
});

export const db = new Hyperbee(core, {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const state = async () => {
	let state = [];
	for await (const {
		key,
		value: { title }
	} of db.createReadStream()) {
		state.push({ pathname: key, title });
	}
	console.log({ db: state });
	return state || [];
};

export const put = async (title: string, body: string) => {
	const content = { title, body };
	const matches = title.match(/[\w]+/g);
	if (!matches) return;
	const pathname = matches.join('-').toLowerCase();
	await db.put(pathname, content);
	return pathname;
};

export const get = async (title: string) => {
	const item = await db.get(title);
	if (!item) return;
	return { content: item.value.body, title: item.value.title, pathname: item.key };
};

export const del = async (title: string) => {
	await db.del(title);
};

export const search = async (query: string) => {};
