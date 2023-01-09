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

	export let data: PageData;

	let render = false;
	const { title, content, navHeight, publicKey } = store.state;
	const success = (data?: { pathname: string }) => {
		snackbar.show('ken du yow!'); // wolof langauge
		console.log(data);
		$content = '';
		$title = '';
		if (data) goto(base + '/' + data.pathname);
	};
	const error = (data: any) => {
		snackbar.show('amna lu hew de!'); // wolof langauge
		console.error(data);
	};
	const encryptFormData= async(data: FormData)=>{
		for(const key of data.keys()){
			data.set(key, await E.encrypt(data.get(key) as string, $publicKey))
		}
	}
</script>

<div class="w-full flex flex-col" style="height: {(globalThis.innerHeight-$navHeight)*0.86}px;">
	<div class="flex justify-between pb-2" >
		<button
			on:click|preventDefault={() => (render = !render)}
			class="btn bg-gray-600 text-xl w-[min-content]  uppercase text-center "
			>{render ? 'markdown' : 'preview'}</button
		>
	</div>
	<form
		method="POST"
		action="?/publish"
		use:enhance={ async ({ form, data, action, cancel }) => {
			console.log('formData', Object.fromEntries(data.entries()));
			if (!$title || !$content) {
				snackbar.show('Abu completal form be yy'); // wolof langauge
				return cancel();
			}
			await encryptFormData(data)
			console.log('encryptedFormData', Object.fromEntries(data.entries()));
			// `form` is the `<form>` element
			// `data` is its `FormData` object
			// `action` is the URL to which the form is posted
			// `cancel()` will prevent the submission

			return async ({ result, update }) => {
				console.log({ result, update });
				result;
				if (result.type === 'success') success(result.data);
				else error(result.data || result.error);
				// `result` is an `ActionResult` object
				// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
			};
		}}
		class="w-full h-full flex flex-col"
	>
	<!-- <input type="text" name="encrypted_dummy" hidden value={data.encryptedDummy} /> -->
		{#if render}
			<Render />
		{:else}
			<Writer encryptedDummy={data.encryptedDummy}/>
		{/if}
	</form>
</div>
