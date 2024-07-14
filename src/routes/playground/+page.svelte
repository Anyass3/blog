<script lang="ts">
	import Writer from '$lib/writer.svelte';
	import Render from '$lib/render.svelte';
	import store from '$lib/store';
	import pstore from './store';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	const { navHeight, writeMode } = store.state;
	const { content, title, cover } = pstore.state;

	$writeMode = true;

	let url: string;

	const fakeUploadImage = (file: File) => {
		url = URL.createObjectURL(file);
		$cover.pathname = url;
		$cover.filename = file.name;
		$cover.progress = 100;
	};
</script>

<svelte:head>
	<title>Playground | DMT Blog</title>
	<meta
		name="description"
		content="A DMT blog playground to write, preview and expriment with the blog webapp features without auth. Have fun!!!"
	/>
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Playground | DMT Blog" />
	<meta property="og:image" content={$page.url.origin + base + '/favicon.png'} />
</svelte:head>

<div class="w-full flex flex-col" style="height: {(globalThis.innerHeight - $navHeight) * 0.86}px;">
	<div class="flex justify-between pb-2">
		<button
			on:click|preventDefault={() => ($writeMode = !$writeMode)}
			class="btn link-border text-xl w-[min-content] uppercase text-center"
			>{!$writeMode ? 'write' : 'preview'}</button
		>
	</div>
	{#if !$writeMode}
		<Render content={$content} title={$title} cover={url} />
	{:else}
		<Writer on:file={(ev) => fakeUploadImage(ev.detail)} state={{ ...pstore.state, navHeight }} />
	{/if}
</div>
