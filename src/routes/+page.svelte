<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	$: console.log('blogs', data.blogs);
</script>

<div class="w-full h-full flex flex-row flex-wrap justify-between gap-4">
	{#each data.blogs as { title, pathname }, idx}
		<div class="bg-gray-900 w-[16rem] h-[16rem] max-w-full aspect-square">
			<img class='bg-gray-500' src="#" alt="">
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
