<script lang="ts">
	import Render from '$lib/render.svelte';
	import Writer from '$lib/writer.svelte';
	import store from '$lib/store';
	import { snackbar } from 'dmt-gui-kit';
	import { goto } from '$app/navigation';
	import * as E from '@anyass3/encryption';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import { getHTML, truncate, uploadXHR } from '$lib/utils';
	import { noop } from 'svelte/internal';
	import Spinner from '$lib/spinner.svelte';

	let isPublishing = false;
	let mdHtml: HTMLDivElement;
	const { title, content, navHeight, publicKey, cover, writeMode } = store.state;

	$writeMode = true;

	const success = (data?: { pathname: string }) => {
		snackbar.show('ken du yow!'); // wolof langauge
		console.log(data);
		// $content = '';
		// $title = '';
		// $cover = {};
		// if (data) goto(base + '/' + data.pathname);
	};
	const error = (data: any) => {
		snackbar.show('amna lu hew de!'); // wolof langauge
		console.error(data);
	};
	const encryptFormData = async (data: FormData) => {
		for (const key of data.keys()) {
			data.set(key, await E.encrypt(data.get(key) as string, $publicKey));
		}
	};
	const uploadImage = async (file: File) => {
		const encryptedDummy = await E.encrypt(E.random(), $publicKey);
		const res = await uploadXHR(file, {
			encryptedDummy: encryptedDummy,
			onProgress: (e) => {
				$cover.progress = (e.loaded * 100.0) / e.total ?? 0;
			}
		}).catch(noop);
		if (res) {
			// console.log({ res, progress });
			if (res.pathname) {
				$cover.pathname = res.pathname;
				$cover.filename = file.name;
				return snackbar.show('Cover image uploaded');
			}
		}
		$cover.progress = 0;
		snackbar.show('Cover image upload failed', { color: 'danger' });
	};

	const prepareHtml = async () => {
		if (!mdHtml) throw new Error('Something went wrong');
		const html = await getHTML($content);
		mdHtml.innerHTML = html;
		const description = truncate(mdHtml.textContent!, 400);

		return { description, html };
	};
</script>

{#if $writeMode}
	<div
		class="w-full flex flex-col"
		class:relative={!$writeMode}
		style="height: {(globalThis.innerHeight - $navHeight) * 0.86}px;"
	>
		<div class="flex justify-between pb-2">
			<button
				on:click|preventDefault={() => ($writeMode = false)}
				class="btn bg-gray-600 text-xl w-[min-content]  uppercase text-center">preview</button
			>
		</div>
		<div class="hidden" bind:this={mdHtml} aria-label="prepare markdown html" />
		<form
			method="POST"
			action="?/publish"
			use:enhance={async ({ data, cancel }) => {
				isPublishing = true;
				if (!$title || !$content) {
					snackbar.show('Abu completal form be yy'); // wolof langauge
					return cancel();
				}

				const { html, description } = await prepareHtml();
				data.set('html', html);
				data.set('description', description);
				await encryptFormData(data);

				return async ({ result }) => {
					// @ts-ignore
					if (result.type === 'success') success(result.data);
					// @ts-ignore
					else error(result.data || result.error);

					isPublishing = false;
				};
			}}
			class="w-full h-full flex flex-col"
		>
			<Writer on:file={(ev) => uploadImage(ev.detail)} state={store.state} />

			<div class="flex absolute bottom-2 left-0">
				<button
					disabled={isPublishing}
					class="btn bg-gray-700 text-xl w-[min-content] uppercase text-center flex gap-1"
				>
					{#if isPublishing}
						<Spinner class="self-center h-6 w-6 p-0 fill-current animate-spin duration-75" />
					{/if}
					publish
				</button>
			</div>
		</form>
	</div>
{:else}
	<div class="relative">
		<button
			on:click|preventDefault={() => ($writeMode = true)}
			class="btn bg-gray-600 text-xl w-[min-content] uppercase text-center sticky"
			style="top: {$navHeight}px;"
			>write
		</button>
		<Render
			content={$content}
			title={$title}
			cover={$cover.pathname ? `${base}/file/${$cover.pathname}` : ''}
		/>
	</div>
{/if}
