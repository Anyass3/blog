<script lang="ts">
	import store from '$lib/store';
	import { snackbar } from 'dmt-gui-kit';
	import { noop } from 'svelte/internal';
	import { uploadXHR } from './utils';
	const { content, navHeight, title, cover } = store.state;

	let progress: number;
	export let encryptedDummy: string;

	const addCoverImage = () => {
		if (!coverImageElement) return;
		coverImageElement.click();
	};

	const handleFileInputChange = async (event: Event) => {
		const file = (event?.target as (EventTarget | null) & { files: FileList })?.files?.[0];
		if (!file) return;

		const res = await uploadXHR(file, {
			encryptedDummy,
			onProgress: (e) => {
				progress = (e.loaded * 100.0) / e.total ?? 0;
			}
		}).catch(noop);
		if (res) {
			console.log({ res, progress });
			if (res.pathname) {
				$cover.pathname = res.pathname;
				$cover.filename = file.name;
				return snackbar.show('Cover image uploaded');
			}
		}
		progress = 0;
		snackbar.show('Cover image upload failed',{color:'danger'});
	};
	let coverImageElement: HTMLInputElement;
	let topHeight: number;
</script>

<div class="h-full w-full focus:ring-2 p-4 ring-gray-800 bg-gray-800 rounded">
	<div bind:clientHeight={topHeight}>
		<input type="text" hidden name="cover" bind:value={$cover.pathname} />
		<input type="file" on:change={handleFileInputChange} bind:this={coverImageElement} hidden />
		<div class="flex gap-4">
			<button on:click|preventDefault={addCoverImage} class="flex btn bg-gray-700 relative">
				<span
					>{progress&&progress < 100
						? 'Uploading cover'
						: (progress == 100 ? 'Uploaded' : 'Add') + ' Cover Image'}</span
				>
				<span
					class="absolute bottom-0 left-0 h-1 bg-green-500 rounded"
					style="width: {progress}%"
				/>
			</button>
			{#if progress == 100}
				<p class="p-2">{$cover.filename}</p>
			{/if}
		</div>

		<input
			name="title"
			bind:value={$title}
			placeholder="Enter your blog title here"
			class="focus:outline-none max-w-full text-6xl flex-grow placeholder:text-gray-700 bg-transparent"
			type="text"
		/>
	</div>

	<textarea
		name="content"
		style="height: {globalThis.innerHeight - $navHeight - topHeight - 150}px;"
		placeholder="write blog contents here"
		bind:value={$content}
		class="flex-grow h-full w-full focus:outline-none placeholder:text-current placeholder:opacity-60 bg-transparent text-xl resize-none"
	/>

	<div class="flex absolute bottom-2 left-0">
		<input
			class="btn bg-gray-700 text-xl w-[min-content] uppercase text-center"
			type="submit"
			value="publish"
		/>
	</div>
</div>
