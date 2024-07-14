<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let state;
	const { content, title, cover, navHeight } = state;

	const dispatch = createEventDispatcher();
	let coverImageElement: HTMLInputElement;
	let topHeight: number;

	const addCoverImage = () => {
		if (!coverImageElement) return;
		coverImageElement.click();
	};

	const handleFileInputChange = async (event: Event) => {
		const file = (event?.target as (EventTarget | null) & { files: FileList })?.files?.[0];
		if (!file) return;
		dispatch('file', file);
	};
</script>

<div class="h-full w-full focus:ring-2 p-1.5 ring-[--normal] border-[--normal] border rounded">
	<div bind:clientHeight={topHeight}>
		<input type="text" hidden name="cover" bind:value={$cover.pathname} />
		<input type="file" on:change={handleFileInputChange} bind:this={coverImageElement} hidden />
		<div class="flex gap-4">
			<button
				on:click|preventDefault={addCoverImage}
				class="flex btn bg-[--normal] text-[--bg] relative"
			>
				<span
					>{$cover.progress && $cover.progress < 100
						? 'Uploading cover'
						: ($cover.progress == 100 ? 'Uploaded' : 'Add') + ' Cover Image'}</span
				>
				<span
					class="absolute bottom-0 left-0 h-1 bg-[--primary] rounded"
					style="width: {$cover.progress}%"
				></span>
			</button>
			{#if $cover.progress == 100}
				<p class="p-2">{$cover.filename}</p>
			{/if}
		</div>

		<input
			name="title"
			bind:value={$title}
			placeholder="Enter your blog title here"
			class="focus:outline-none w-full text-5xl sm:text-6xl flex-grow placeholder:text-gray-700 bg-transparent"
			type="text"
		/>
	</div>

	<textarea
		name="content"
		style="height: {globalThis.innerHeight - $navHeight - topHeight - 150}px;"
		placeholder="write blog contents here"
		bind:value={$content}
		class="flex-grow h-full w-full focus:outline-none placeholder:text-current placeholder:opacity-50 bg-transparent text-xl resize-none as"
	></textarea>
</div>
