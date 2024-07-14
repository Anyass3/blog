<script lang="ts">
	import { page } from '$app/stores';
	import store from '$lib/store';
	import metamask from '$lib/metamask-fox.svg';
	import CopyIcon from '$icons/CopyIcon.svelte';
	import { base } from '$app/paths';

	import LightMode from '$lib/light-mode.svelte';
	import DarkMode from '$lib/dark-mode.svelte';

	import * as E from '@anyass3/encryption/web';
	import { snackbar, copyToClipboard } from 'dmt-gui-kit';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { clickOutside, getWindow, noop } from './utils';
	import SubscribeForm from './subscribeForm.svelte';

	const dispatch = createEventDispatcher();

	const hasMMPublicKey: boolean = $page.data.hasPublicKey;

	export let isAuthenticated = false;

	const { navHeight, metamaskPublicKey, token } = store.state;

	const copyPublicKey = async () =>
		copyToClipboard($metamaskPublicKey, 'Copied publickey from metamask to clipboard');

	const doChallenge = async () => {
		if (!E.isMetaMask) {
			snackbar.show('Metamask must be available!', { color: 'danger' });
			return;
		}
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
			if (!decryptedData) return dispatch('auth', false);

			const [signPublicKey, publicKey, signedToken] = decryptedData.split('::') as [
				string,
				string,
				string
			];
			dispatch('auth', true);
			$token = E.verifySignature(signedToken, signPublicKey);
			store.dispatch('publicKey', publicKey);
			store.dispatch('signPublicKey', signPublicKey);
			location.reload();
		} catch (error) {
			dispatch('auth', false);
			console.trace(error);
			snackbar.show(typeof error == 'string' ? error : (error as { message: string }).message);
		}
	};

	const setColorScheme = (scheme: 'light' | 'dark') => {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
		let colorScheme = scheme || localStorage.getItem('colorScheme') || systemTheme;
		// if colorScheme is not light or dark, set it to system theme
		if (colorScheme !== 'light' && colorScheme !== 'dark') colorScheme = systemTheme;

		localStorage.setItem('theme', colorScheme);
		getWindow().setColorScheme();
	};

	onMount(() => {
		if (isAuthenticated && !$token) doChallenge();
	});

	$: isLoggedIn = isAuthenticated && !!$token;

	let showSubscribeModel = false;
</script>

<div
	bind:clientHeight={$navHeight}
	class="w-full sticky top-0 z-50 bg-[--bg] border-b-2 border-[--normal] flex flex-col justify-center items-center"
>
	<div
		class="py-4 lg:py-6 w-[min(55rem,100%)] flex flex-wrap justify-between items-center font-semibold"
	>
		<div class="flex-grow flex justify-between items-center">
			<div>
				<a
					href="{base}/"
					class:active={$page.url.pathname == base + '/'}
					class="btn w-[min-content] p-[0.5rem!important] border-transparent uppercase text-center"
					>blogs</a
				>
				{#if isLoggedIn}
					<a
						href="{base}/new"
						class:active={$page.url.pathname == base + '/new'}
						class="btn w-[min-content] p-[0.5rem!important] border-transparent uppercase text-center"
						>new</a
					>
				{/if}
				<a
					href="{base}/playground"
					title="playground"
					class:active={$page.url.pathname == base + '/playground'}
					class="btn w-[min-content] p-[0.5rem!important] border-transparent uppercase text-center"
					>play</a
				>
			</div>

			<div class="relative" use:clickOutside={() => (showSubscribeModel = false)}>
				<button
					on:click={() => (showSubscribeModel = !showSubscribeModel)}
					class="btn flex gap-2 items-center">Subscribe</button
				>
				<SubscribeForm {showSubscribeModel} />
			</div>
		</div>
		<div class="flex flex-wrap gap-6 items-center flex-grow justify-between md:justify-end pr-2">
			{#if !isLoggedIn}
				<button class="btn flex gap-2 items-center" on:click={doChallenge}
					><img src={metamask} class="w-5" alt="metamask" />Auth</button
				>
				{#if !hasMMPublicKey}
					{#if !$metamaskPublicKey}
						<button
							class="btn flex gap-2 items-center"
							on:click={() => {
								if (!E.isMetaMask) {
									snackbar.show('Metamask must be available!', { color: 'danger' });
									return;
								}
								store.dispatch('metamaskPublicKey');
							}}
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
				{/if}
			{/if}
			<button
				class="p-2 rounded-full flex dark:hidden justify-between ml-6 md:ml-0 link-border"
				on:click={() => setColorScheme('dark')}
			>
				<!-- <img src="{base}/dark_mode.svg" alt="dark" /> -->
				<DarkMode />
			</button>
			<button
				class="p-2 rounded-full hidden dark:flex justify-between ml-6 md:ml-0 link-border"
				on:click={() => setColorScheme('light')}
			>
				<!-- <img src="{base}/light_mode.svg" alt="light" /> -->
				<LightMode />
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.active {
		@apply text-[--primary];
	}
	button,
	a {
		@apply active:text-[--primary] lg:hover:text-[--primary];
	}
</style>
