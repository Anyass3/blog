<script lang="ts">
	import { page } from '$app/stores';
	import store from '$lib/store';
	import metamask from '$lib/metamask-fox.svg';
	import CopyIcon from '$icons/CopyIcon.svelte';
	import { base } from '$app/paths';

	import * as E from '@anyass3/encryption';
	import { snackbar, copyToClipboard } from 'dmt-gui-kit';
	import { noop } from 'svelte/internal';
	import { createEventDispatcher } from 'svelte';

	const dispatch=createEventDispatcher()

	export let isAuthenticated=false;

	const { navHeight, metamaskPublicKey, token } = store.state;

	const copyPublicKey = async () =>
		copyToClipboard($metamaskPublicKey, 'Copied publickey from metamask to clipboard');

	const doChallenge = async () => {
		try {
			const res = await fetch(base + '/auth', {
				method: 'post',
				headers: {
					accept: 'application/json',
					'x-action': 'login'
				}
			});
			const { encryptedData } = (await res.json()) || {};
			const decryptedData = await E.decrypt(encryptedData).catch(noop);
			if (!decryptedData) return dispatch('auth',false);

			const [signPublicKey, publicKey, signedToken] = decryptedData.split('::') as [
				string,
				string,
				string
			];
			dispatch('auth',true)
			$token = E.verifySignature(signedToken, signPublicKey);
			store.dispatch('publicKey', publicKey);
			store.dispatch('signPublicKey', signPublicKey);

		} catch (error) {
			dispatch('auth',false)
			console.trace(error)
			snackbar.show(typeof error == 'string' ? error : (error as any).message);
		}
	};
</script>

<div
	bind:clientHeight={$navHeight}
	class="w-full sticky top-0 z-50 bg-[rgb(29,28,45)] text-cyan-500 border-b-2 border-cyan-900 flex flex-col justify-center items-center"
>
	<div
		class="{$page.url.pathname == base + '/write'
			? 'py-4'
			: 'py-8'} w-[min(55rem,100%)] flex flex-wrap justify-between"
	>
		<div>
			<a
				href="{base}/"
				class:active={$page.url.pathname == base + '/'}
				class="btn text-xl w-[min-content] border-2 p-[0.5rem!important] border-transparent uppercase text-center "
				>blogs</a
			>
			{#if isAuthenticated}
				<a
					href="{base}/write"
					class:active={$page.url.pathname == base + '/write'}
					class="btn text-xl w-[min-content]  border-2  p-[0.5rem!important] border-transparent uppercase text-center "
					>write</a
				>
			{/if}
		</div>
		{#if !isAuthenticated}
			<div class="flex flex-wrap gap-6">
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
