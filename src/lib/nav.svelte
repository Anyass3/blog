<script lang="ts">
	import { page } from '$app/stores';
	import store from '$lib/store';
	import metamask from '$lib/metamask-fox.svg';
	import CopyIcon from '$icons/CopyIcon.svelte';
	import { base } from '$app/paths';

	import * as E from '@anyass3/encryption';
	import { snackbar, copyToClipboard } from 'dmt-gui-kit';

	const { navHeight, metamaskPublicKey, token } = store.state;

	const copyPublicKey = async () =>
		copyToClipboard($metamaskPublicKey, 'Copied publickey from metamask to clipboard');

	const doChallenge = async () => {
		try {
			const [signPublicKey, publicKey, signedToken] = (
				await E.decrypt($page.data.encryptedData)
			).split('::') as [string, string, string];
			
			store.dispatch('publicKey', publicKey);
			store.dispatch('signPublicKey', signPublicKey);
			console.log({ signedToken });
			$token = E.verifySignature(signedToken, signPublicKey);
			console.log({ $token, signPublicKey, publicKey });
		} catch (error) {
			snackbar.show(typeof error == 'string' ? error : (error as any).message);
		}
	};
	$: console.log($page.data);
</script>

<div
	bind:clientHeight={$navHeight}
	class="w-full sticky top-0 z-50 bg-[rgb(29,28,45)] text-cyan-500 border-b-2 border-cyan-900 flex flex-col justify-center items-center"
>
	<div class="py-8 w-[min(55rem,100%)] flex justify-between">
		<div>
			<a
				href="{base}/"
				class:active={$page.url.pathname == '/'}
				class="btn text-xl w-[min-content] border-2 p-[0.5rem!important] border-transparent uppercase text-center "
				>blogs</a
			>
			{#if $token}
				<a
					href="{base}/write"
					class:active={$page.url.pathname == '/write'}
					class="btn text-xl w-[min-content]  border-2  p-[0.5rem!important] border-transparent uppercase text-center "
					>write</a
				>
			{/if}
		</div>
		{#if !$token}
			<div class="flex flex-col sm:flex-row gap-6">
				<button class="btn flex gap-2 items-center" on:click={doChallenge}
					><img src={metamask} class="w-5" alt="metamask" />Auth</button
				>
				{#if !$metamaskPublicKey}
					<button
						class="btn flex gap-2 items-center"
						on:click={() => store.dispatch('metamaskPublicKey')}
						><img src={metamask} class="w-5" alt="metamask" /><span class="whitespace-nowrap"
							>Public Key</span
						></button
					>
				{:else}
					<button
						on:click={copyPublicKey}
						class="btn flex gap-2 items-center active:text-green-500 active:bg-green-200"
						><CopyIcon size="1x" /><span class="whitespace-nowrap">Public Key</span></button
					>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.active {
		@apply border-slate-500;
	}
</style>
