<script lang="ts">
	import { SnackBar } from 'dmt-gui-kit';

	import '../app.css';
	import Nav from '$lib/nav.svelte';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	$:console.log(data)
	export let data: PageData

	const onAuth=(event:Event)=>{
		if(event.detail){
			data.isAuthenticated=true;
		}else data.isAuthenticated=false;
	}
</script>

<main class="flex flex-col justify-center items-center min-h-screen {$page.url.pathname == base + '/write'?'overflow-hidden max-h-screen':''}">
	<Nav on:auth={onAuth} isAuthenticated={data.isAuthenticated} />
	<div class="w-[min(55rem,100%)] px-3  sm:px-0 pt-4 flex-grow relative">
		<slot />
	</div>
</main>
<SnackBar />
