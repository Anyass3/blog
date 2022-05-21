<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error,
				status
			}
		};
	}
</script>

<script lang="ts">
	export let status;
	export let error: any;
	const refreshPage = () => {
		window.location.reload();
	};
	console.error(error?.stack);
	$: console.log({ error, status });
</script>

<div class=" flex justify-center flex-wrap items-center flex-grow font-light">
	<div class="text-red-500">
		<p class="text-7xl">Error Code: {status}</p>
		<p class="text-5xl">{error?.message}</p>
	</div>
	<button
		on:click={refreshPage}
		class="border-2 p-1 font-semibold shadow-lg rounded-md text-red-500 border-red-500 hover:bg-red-100 hover:border-red-400 hover:shadow-sm"
		>refresh page</button
	>
</div>
