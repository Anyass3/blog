<script lang="ts">
	import Render from '$lib/render.svelte';
	import Writer from '$lib/writer.svelte';
	import store from '$lib/store';
	import { enhance } from '$lib/form';
	import { goto } from '$app/navigation';
	let render = false;
	const { title, content, snack } = store.state;
	const result = (data) => {
		snack.show('ken du yow!');
		console.log(data);
		$content = '';
		$title = '';
		goto('/' + data.pathname);
	};
	const error = (data) => {
		snack.show('amna lu hew de!');
		console.error(data);
	};
	const publish = async () => {
		if (!$title || !$content) {
			snack.show('Abu completal form be');
			return;
		}
		try {
			const res = await fetch('/write', {
				method: 'post',
				headers: {
					accept: 'application/json'
				},
				body: JSON.stringify({ title: $title, content: $content })
			});
			console.log('res', res);

			const data = await res.json();
			if (res.ok) {
				result(data);
			} else {
				error(data);
			}
		} catch (e) {
			if (error) {
				error(null);
			} else {
				throw e;
			}
		}
	};
</script>

<div class="w-full h-full flex flex-col">
	<div class="sticky top-0 flex justify-between gap-5">
		<button
			on:click={() => (render = !render)}
			class="btn p-[0.25rem!important] bg-gray-600 text-xl w-[min-content!important]  uppercase text-center "
			>{render ? 'markdown' : 'preview'}</button
		>
		<div class="flex gap-2">
			<input
				bind:value={$title}
				placeholder="Title"
				class="focus:outline-none max-w-full w-[25rem] p-[0.25rem!important] flex-grow placeholder:text-gray-700 bg-slate-500 rounded text-center"
				type="text"
			/>
			<button
				on:click={publish}
				class="btn p-[0.25rem!important] bg-gray-700 text-xl w-[min-content!important]  uppercase text-center "
				>publish</button
			>
		</div>
	</div>
	{#if render}
		<Render />
	{:else}
		<Writer />
	{/if}
</div>
