<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { timeDelta, truncate } from '$lib/utils';
	import { page } from '$app/stores';

	export let data: PageData;
	$: console.log('blogs', data.blogs);
</script>

<svelte:head>
	<title>DMT Blog</title>
	<meta name="description" content="A list of all my personal blogs" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Persnal Blogs | DMT" />
	<meta property="og:image" content={$page.url.origin + base + '/favicon.png'} />
</svelte:head>

<div class="w-full h-full flex flex-row flex-wrap justify-between gap-4">
	{#each data.blogs as { title, pathname, cover, publishedAt }}
		<a
			href="{base}/{pathname}"
			class="bg-gray-900 w-[16rem] flex gap-4 max-w-full relative rounded transition-all ease-in-out duration-300 group hover:scale-105 overflow-hidden"
		>
			<div class="bg-gray-400 aspect-square w-16 rounded">
				{#if cover}
					<img class="rounded object-cover w-full h-full" src="{base}/file/{cover}" alt="" />
				{/if}
			</div>
			<div class="flex flex-col justify-between">
				<p class="text-base w-full block">
					<span class="group-hover:hidden">{truncate(title)}</span>
					<span
						class="group-hover:underline hidden group-hover:place-items-center group-hover:bg-gray-900 group-hover:bg-opacity-80 group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:h-full group-hover:w-full group-hover:p-1 group-hover:grid "
						>{title}</span
					>
				</p>
				<p class=" text-xs">Published: <span use:timeDelta={{ date: publishedAt }} /></p>
			</div>
		</a>
	{/each}
	{#if !data.blogs.length}
		<p class=" text-4xl">Zero blogs. Start writing buddy!</p>
	{/if}
</div>

<style>
	/* a {
		background-color: var(--zeta-green);
		color: green;
	} */
</style>
