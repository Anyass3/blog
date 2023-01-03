<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	$: console.log('blogs', data.blogs);
</script>

<div class="w-full h-full flex flex-row flex-wrap justify-between gap-4">
	{#each data.blogs as { title, pathname }, idx}
		<div class="bg-gray-900 w-[16rem] h-[16rem] max-w-full aspect-square p-2 rounded-sm transition-transform ease-in-out duration-300 hover:scale-105">
			<img class='bg-gray-500 aspect-[7/6]' src="/dmt-2.webp" alt="">
			<p class="text-2xl">
				<!-- {idx + 1}. -->
				<a href="/{pathname}" class=" underline">{title}</a>
			</p>
		</div>
	{/each}
</div>

<style>
	/* a {
		background-color: var(--zeta-green);
		color: green;
	} */
</style>
