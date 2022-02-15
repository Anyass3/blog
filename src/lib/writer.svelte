<script>
	import store from '$lib/store';
	const { content } = store.state;
</script>

<div class="h-full w-full">
	<textarea
		name=""
		id=""
		bind:value={$content}
		class="h-full w-full focus:outline-none focus:ring-2 p-2 ring-gray-800 bg-gray-800"
	/>
</div>
