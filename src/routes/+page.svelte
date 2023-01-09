<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;
	$: console.log('blogs', data.blogs);
</script>

<div class="w-full h-full flex flex-row flex-wrap justify-between gap-4">
	{#each data.blogs as { title, pathname, cover }, idx}
		<div
			class="bg-gray-900 w-[16rem] h-[16rem] flex flex-col justify-between max-w-full relative aspect-square rounded transition-all ease-in-out duration-300 group group-hover:hover:scale-105 overflow-hidden"
		>
			<img class="bg-gray-400 aspect-[9/6] rounded" src="{base}/file/{cover}" alt="" />
			<a
				href="{base}/{pathname}"
				class="hover:underline text-xl hover:bg-gray-900 hover:bg-opacity-80 px-1 group-hover:absolute group-hover:bottom-0 w-full block"
				>{title}</a
			>
		</div>
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
