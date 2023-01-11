<script lang="ts">
	import { base } from '$app/paths';
	import store from '$lib/store';
	import Render from '$lib/render.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	store.commit('writeMode', false);

	// console.log(data);
</script>

<svelte:head>
	<title>{data.title} | DMT Blog</title>
	<meta name="description" content={data.description} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="{data.title} | DMT Blog" />
	<meta
		property="og:image"
		content={data.cover ? `${base}/file/${data.cover}` : $page.url.origin + base + '/favicon.png'}
	/>
</svelte:head>

<Render
	contentType="html"
	content={data.html}
	date={data.publishedAt}
	title={data.title}
	cover={data.cover ? `${base}/file/${data.cover}` : ''}
/>
