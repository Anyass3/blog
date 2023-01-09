<script lang="ts">
	import { base } from '$app/paths';
	import Render from '$lib/render.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full h-full flex flex-col">
	<h1 class="text-5xl">{data.title}</h1>
	<img src="{base}/file/{data.cover}" alt="{data.title}">
	<Render content={data.content} />
</div>
