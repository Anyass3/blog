<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="grid h-full place-content-center px-4">
	<div class="text-center">
		<h1 class="text-9xl font-black text-gray-200">{$page.status}</h1>

		<p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

		<p class="mt-4 text-gray-500">
			{$page.status == 404
				? "We can't find that page."
				: `${$page.error?.message || 'Some went wrong'}`}
		</p>

		<a
			href="/"
			class="mt-6 inline-block rounded border-[--dmt-cyan] border px-5 py-3 text-sm font-medium text-white focus:outline-none btn"
		>
			Go Back Home
		</a>
	</div>
</div>
