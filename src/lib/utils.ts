import { base } from '$app/paths';
import Markdown from 'markdown-hljs';

type Opts = {
	onProgress?: (ev: ProgressEvent<XMLHttpRequestEventTarget>) => void;
	instance?: (xhr: XMLHttpRequest) => void;
	encryptedDummy: string;
};

interface FileResponse {
	name: string;
	pathname: string;
}

export const uploadXHR = (file: File, { onProgress, instance, encryptedDummy }: Opts) => {
	return new Promise<FileResponse>(
		(resolve, reject: (value: Record<string, string | number> | undefined) => void) => {
			const url = base + '/file/upload';
			const xhr = new XMLHttpRequest();
			if (instance) instance(xhr);
			const formData = new FormData();
			xhr.withCredentials = true;
			xhr.open('POST', url, true);
			xhr.setRequestHeader('x-encrypted-dummy', encryptedDummy);

			if (onProgress) xhr.upload.addEventListener('progress', onProgress);

			xhr.onload = function (this) {
				resolve(JSON.parse(this.response || '{}'));
			};

			xhr.onerror = function (this) {
				reject(JSON.parse(this.response || '{}'));
			};

			xhr.onabort = function (this) {
				reject({ ...JSON.parse(this.response || '{}'), aborted: true });
			};

			formData.append('file', file);
			formData.append('tags', '');
			xhr.send(formData);
		}
	);
};
type timeDeltaOpts = { ago?: boolean; date: string | number | Date };

export function timeDelta(node: HTMLElement, { ago = true, date = 0 } = {} as timeDeltaOpts) {
	//svelte action
	const round = (t: number, dsc: string) => `${Math.floor(t)} ${dsc}${ago ? ' ago' : ''}`;
	const datetime = new Date(date);
	let timeoutId: NodeJS.Timeout;
	function setTimeDelta() {
		let nextInterval: number | null = null;
		const now = new Date();
		let seconds = ((now.getTime() - datetime.getTime()) * (ago ? 1 : -1)) / 1000; //in seconds
		let expired = false;
		if (seconds < 0) {
			if (!ago) {
				node.style.color = '#FF0000';
				expired = true;
			} else {
				node.style.color = '';
				return;
			}
		}
		seconds = Math.abs(seconds);

		const mins = seconds / 60;
		const hrs = mins / 60;
		const days = hrs / 24;
		const weeks = days / 7;
		let text = ago || expired ? 'just now' : 'few seconds';
		if (weeks >= 4) {
			text = `${datetime.getDate()}`;
			const months = weeks / 4;
			const years = months / 12;
			if (months < 13) {
				const isOne = Math.floor(months) == 1;
				text = round(months, 'month' + (isOne ? '' : 's'));
			} else {
				let dsc = 'year';
				if (years >= 2) {
					dsc = 'years';
				}
				text = round(years, dsc);
			}
		} else if (weeks >= 2) {
			text = round(weeks, 'weeks');
		} else if (days >= 2) {
			text = round(days, 'days');
		} else if (hrs >= 2) {
			text = round(hrs, 'hours');
		} else if (mins >= 2) {
			text = round(mins, 'minutes');
		} else if (seconds >= 60) {
			text = round(mins, 'minute');
		} else if (seconds >= 5) {
			text = round(seconds, 'seconds');
		}
		if (expired) text = text + ' ago';
		node.textContent = text;
		if (text.includes('minute')) nextInterval = 1000 * 60;
		else if (text.match(/(second)|(now)/)) nextInterval = 5000;
		// console.log('nextInterval', nextInterval, seconds);
		if (nextInterval) timeoutId = setTimeout(setTimeDelta, nextInterval);
	}
	setTimeDelta();
	return {
		destroy() {
			clearTimeout(timeoutId);
		}
	};
}

export const truncate = (text = '', max = 20) => {
	const len = text.length;
	const r = /(.+)\.([\w]+)$/.exec(text);

	if (r) {
		const dots = len > max ? '...' : '.';
		return r[1].slice(0, max) + dots + r[2];
	}
	text = text.slice(0, max);
	return len > max ? text + '...' : text;
};

export const getHTML = async (content: string) => {
	const { lqEngine } = await import('./liquid');
	const rendered = lqEngine.parseAndRenderSync(content);
	return Markdown(rendered);
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (..._args: unknown[]) => { };


export const clickOutside = <F extends () => void>(node: HTMLElement, fn: F) => {
	const isOutside = (e: Event) => {
		if (node && !node.contains(e.target as Node) && !e.defaultPrevented) {
			fn()
		}
	}
	document.body.addEventListener("click", isOutside, true)
	document.body.addEventListener("focus", isOutside, true)
	return {
		destroy() {
			document.body.removeEventListener("click", isOutside, true)
			document.body.removeEventListener("focus", isOutside, true)
		}
	}
}

export const getWindow = (): CustomWindow => {
	return (window || globalThis) as CustomWindow;
}