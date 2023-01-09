import { base } from "$app/paths";

type Opts =
	{
		onProgress?: (ev: ProgressEvent<XMLHttpRequestEventTarget>) => void,
		instance?: (xhr: XMLHttpRequest) => void,
		encryptedDummy: string;
	}

interface FileResponse {
	name: string;
	pathname: string;
}

export const uploadXHR = (
	file: File,
	{ onProgress, instance, encryptedDummy }: Opts
) => {
	return new Promise<FileResponse>(
		(resolve, reject: (value: Record<string, any> | undefined) => void) => {
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
		})
};