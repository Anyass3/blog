<script>
	import store from '$lib/store';
	const { content, navHeight } = store.state;
</script>

<div class="h-full w-full">
	<textarea
		name=""
		id=""
		bind:value={$content}
		style="height:{(innerHeight - $navHeight) * 0.9}px;"
		class="h-full w-full focus:outline-none focus:ring-2 p-2 ring-gray-800 bg-gray-800"
	/>
</div>
