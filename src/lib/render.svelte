<script lang="ts">
	// import { base } from '$app/paths';
	import { getHTML, timeDelta } from './utils';

	type Props = {
		content: string;
		cover: string;
		title: string;
		contentType: 'markdown' | 'html';
		date?: number;
	};

	let { content = '', cover = '', title = '', contentType = 'markdown', date }: Props = $props();

	let htmlContent = $state('');

	$effect(() => {
		getHTML(content).then((html) => {
			htmlContent = html;
		});
	});
</script>

<div class="w-full h-full flex flex-col gap-4 overflow-y-auto pb-20">
	<h1 class="text-5xl sm:text-6xl font-bold text-[--imp]">{title}</h1>
	{#if date}
		<p class="text-base font-light">Published: <span use:timeDelta={{ date }}></span></p>
	{/if}
	{#if cover}
		<img src={cover} alt={title} />
	{/if}
	<div class="relative z-20 prose prose-slate mt-8 dark:prose-dark min-w-full">
		{#if contentType == 'markdown'}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html htmlContent}
		{:else}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html content}
		{/if}
	</div>
</div>
