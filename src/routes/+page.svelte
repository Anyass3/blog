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
	<meta property="og:title" content="Personal Blogs | DMT" />
	<meta property="og:image" content={$page.url.origin + base + '/favicon.png'} />
</svelte:head>

<div class="w-full h-full gap-4 grid grid-cols-1 md:grid-cols-2">
	{#each data.blogs as { title, pathname, cover, publishedAt }}
		<div>
			<a
				href="{base}/{pathname}"
				class="grid grid-cols-8 gap-4 relative rounded transition-all ease-in-out duration-300 scale-[.99] group hover:scale-100 shadow-lg dark:hover:shadow-slate-800 link-border"
			>
				{#if cover}
					<div class="col-span-2">
						<img class="rounded object-cover w-full h-full" src="{base}/file/{cover}" alt="" />
					</div>
				{/if}
				<div class="col-span-6 flex flex-col justify-between relative p-2">
					<p class="text-base w-full block">
						<span class="hidden md:block group-hover:md:hidden">{truncate(title, 70)}</span>
						<span class="md:hidden group-hover:underline">{title}</span>

						<span class="hidden group-hover:xl:block group-hover:underline"
							>{truncate(title, 100)}</span
						>
						<span class="hidden group-hover:lg:block group-hover:xl:hidden group-hover:underline"
							>{truncate(title, 120)}</span
						>
					</p>
					<p class="text-xs pt-3">
						Published: <span use:timeDelta={{ date: publishedAt }}></span>
					</p>
				</div>
			</a>
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
	/* .sh{
		filter: drop-shadow(0 15px 13px rgba(255, 255, 255, 0.04)) drop-shadow(0 8px 5px rgb(255 255 255 / 0.1));
	} */
</style>
