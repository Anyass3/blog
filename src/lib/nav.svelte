<script>
	import { page } from '$app/stores';
</script>

<div class="p-2 sticky top-0 z-50 bg-[rgb(29,28,45)] text-cyan-500 border-b-2 border-cyan-900">
	<a
		href="/"
		class:active={$page.url.pathname == '/'}
		class="btn text-xl w-[min-content!important] border-2 p-[0.5rem!important] border-transparent uppercase text-center "
		>blogs</a
	>
	<a
		href="/write"
		class:active={$page.url.pathname == '/write'}
		class="btn text-xl w-[min-content!important]  border-2  p-[0.5rem!important] border-transparent uppercase text-center "
		>write</a
	>
</div>

<style>
	.active {
		@apply border-slate-500;
	}
</style>
