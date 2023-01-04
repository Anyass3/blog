<script lang="ts">
	import { SnackBar } from 'dmt-gui-kit';

	import '../app.css';
	import Nav from '$lib/nav.svelte';
</script>

<main class="flex flex-col justify-center items-center min-h-screen">
	<Nav />
	<div class="w-[min(55rem,100%)] px-3  sm:px-0 pt-4 min-h-full flex-grow">
		<slot />
	</div>
</main>
<SnackBar />
