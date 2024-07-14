import * as $penv from '$env/static/private'
import Hyperbee from 'hyperbee';
import Hypercore from 'hypercore';
import path from 'path';
import { dev, building } from '$app/environment';
import RAM from 'random-access-memory';
import { v4 as uuidV4 } from '@lukeed/uuid';

export interface Result<T> {
	seq: number;
	key: string;
	value: T;
}

export type BlogResult = Result<
	Record<'title' | 'html' | 'cover' | 'description' | 'content', string> & { publishedAt: number }
>;
export type FileResult = Result<Buffer>;
export type PutOpts = {
	title: string;
	html: string;
	description: string;
	content: string;
	cover?: string;
};

export type Subscriber = {
	email: string;
	name: string;
};

const makeRam = (filename) => {
	// filename will be one of: data, bitfield, tree, signatures, key, secret_key
	// the data file will contain all your data concatenated.

	// just store all files in ram by returning a random-access-memory instance
	return new RAM();
};

const core = new Hypercore(building || dev ? ($penv.DB_PATH || makeRam) : path.join($penv.HOME, '/.dmt-here/.db'));

core.ready().then(() => {
	console.log({ dbKey: core.key });
});

export const db = new Hyperbee(core, {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const blogsDb = db.sub('blogs', {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const subscribersDb = db.sub('subscribers', {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const files = db.sub('files', {
	keyEncoding: 'utf-8',
	valueEncoding: 'binary'
});

export const state = async () => {
	const state: { pathname: string; title: string; cover: string; publishedAt: number }[] = [];
	for await (const {
		key,
		value: { title, cover, publishedAt }
	} of blogsDb.createReadStream()) {
		state.unshift({ pathname: key, title, cover, publishedAt });
	}
	// console.log({ db: state });
	return state || [];
};

export const put = async ({ title, ...rest }: PutOpts) => {
	const data = { title, ...rest, publishedAt: Date.now() };
	const matches = title.match(/[\w]+/g);
	if (!matches) return;
	const pathname = matches.join('-').toLowerCase();
	await blogsDb.put(pathname, data);
	return pathname;
};

export const get = async (title: string) => {
	const item: BlogResult = await blogsDb.get(title);
	if (!item) return;
	return { ...item.value, pathname: item.key };
};

export const del = async (title: string) => {
	return await blogsDb.del(title);
};

export const saveFile = async (blob: Blob) => {
	const buf = Buffer.from(await blob.arrayBuffer());
	const pathname = uuidV4();
	await files.put(pathname, buf);
	return { pathname };
};

export const getFile = async (pathname: string): Promise<FileResult> => {
	return await files.get(pathname);
};

// export const search = async (query: string) => {};

export const getSubscribers = async () => {
	const subscribers: Subscriber[] = [];
	for await (const { key, value } of subscribersDb.createReadStream()) {
		subscribers.push({ email: key, name: value.name });
	}
	return subscribers;
}

export const saveSubscriber = async (subscriber: Subscriber) => {
	await subscribersDb.put(subscriber.email, subscriber);
}

export const delSubscriber = async (email: string) => {
	await subscribersDb.del(email);
}

export const getSubscriber = async (email: string) => {
	const { value } = await subscribersDb.get(email);

	return value;
}