<script lang="ts">
	import { SnackBar } from 'dmt-gui-kit';
	import store from '$lib/store';
	import '../app.css';
	import Nav from '$lib/nav.svelte';
	export let data;

	const { writeMode } = store.state;

	const onAuth = (event: Event) => {
		if (event.detail) {
			data.isAuthenticated = true;
		} else data.isAuthenticated = false;
	};
</script>

<main
	class="flex flex-col justify-center items-center min-h-screen
	{$writeMode ? 'overflow-hidden max-h-screen' : ''}"
>
	<Nav on:auth={onAuth} isAuthenticated={data.isAuthenticated} />
	<div class="w-[min(55rem,100%)] px-3 lg:px-0 pt-4 flex-grow relative">
		<slot />
	</div>
</main>
<SnackBar />
