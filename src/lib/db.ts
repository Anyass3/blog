import { HOME } from '$env/static/private';
import Hyperbee from 'hyperbee';
import Hypercore from 'hypercore';
import path from 'path';
import { dev, building } from '$app/environment';
import RAM from 'random-access-memory';
import { randomBytes } from 'crypto'

export interface Result<T>{
  seq: number;
  key: string;
  value: T
}

export type BlogResult=Result<Record<'title' | 'content' | 'cover', string>>
export type FileResult=Result<Buffer>

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

export const db=new Hyperbee(core, {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const blogsDb = db.sub('blogs', {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const files = db.sub('files', {
	keyEncoding: 'utf-8',
	valueEncoding: 'binary'
})

export const state = async () => {
	let state = [];
	for await (const {
		key,
		value: { title }
	} of blogsDb.createReadStream()) {
		state.push({ pathname: key, title });
	}
	// console.log({ db: state });
	return state || [];
};

export const put = async (title: string, content: string, cover?: string) => {
	const data = { title, content, cover };
	const matches = title.match(/[\w]+/g);
	if (!matches) return;
	const pathname = matches.join('-').toLowerCase();
	await blogsDb.put(pathname, data);
	return pathname;
};

export const get = async (title: string) => {
	const item: BlogResult = await blogsDb.get(title);
	if (!item) return;
	return { content: item.value.content, title: item.value.title, pathname: item.key };
};

export const del = async (title: string) => {
	return await blogsDb.del(title);
};


export const saveFile = async (blob: Blob) => {
	const buf = Buffer.from(await blob.arrayBuffer());
	const pathname = randomBytes(36).toString('hex')
	await files.put(pathname, buf)
	return { pathname }
}

export const getFile = async (pathname: string):Promise<FileResult> => {
	return await files.get(pathname);
}

export const search = async (query: string) => { };
