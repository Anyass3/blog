<script>
	import { enhance } from '$app/forms';
	import { snackbar } from 'dmt-gui-kit';
	import Input from './input.svelte';
	import Spinner from './spinner.svelte';
	import { fade } from 'svelte/transition';
	let isSubscribing = $state(false);

	let { showSubscribeModel = false } = $props();
</script>

{#if showSubscribeModel}
	<form
		transition:fade
		method="POST"
		action="/email?/subscribe"
		use:enhance={async ({ formData, cancel }) => {
			if (!formData.get('email')) {
				snackbar.show('Abu completal form be yy'); // wolof langauge
				return cancel();
			}
			isSubscribing = true;
			return async () => {
				isSubscribing = false;
				showSubscribeModel = false;
			};
		}}
		class="absolute right-[calc(-140px+50%)] lg:right-[calc(-150px+50%)] p-2 mt-1 border-2 w-[280px] lg:w-[300px] bg-[--bg] border-[--normal] rounded shadow-lg"
	>
		<Input type="text" label="Name" />
		<Input type="email" label="Email" required />
		<button
			class="btn w-full mt-2 border border-[--normal] active:border-[--primary] lg:hover:border-[--primary] active:text-[--primary] lg:hover:text-[--primary] flex gap-1 items-center justify-center"
		>
			{#if isSubscribing}
				<Spinner class="self-center h-6 w-6 p-0 fill-current animate-spin duration-75" />
			{/if}
			Subscribe</button
		>
	</form>
{/if}
