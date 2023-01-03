
<script lang="ts">
	import { page } from "$app/stores";


	const refreshPage = () => {
		window.location.reload();
	};
</script>

<div class=" flex justify-center flex-wrap items-center flex-grow font-light">
	<div class="text-red-500">
		<p class="text-7xl">Error Code: {$page.status}</p>
		<p class="text-5xl">{$page.error?.message}</p>
	</div>
	<button
		on:click={refreshPage}
		class="border-2 p-1 font-semibold shadow-lg rounded-md text-red-500 border-red-500 hover:bg-red-100 hover:border-red-400 hover:shadow-sm"
		>refresh page</button
	>
</div>
