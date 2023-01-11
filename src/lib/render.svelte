<script lang="ts">
	import { base } from '$app/paths';
	import { getHTML, timeDelta } from './utils';

	export let content: string;
	export let cover: string;
	export let title: string;
	export let contentType: 'markdown' | 'html' = 'markdown';
	export let date = undefined as unknown as number;

	export let codeStyle = '/hljs/github-dark.css';
	let shadowroot: ShadowRoot;

	$: style = codeStyle
		? `<link rel="stylesheet" href=${base + codeStyle} />
		<style>
			*{
				user-select:text;
			}
			:root {
				--zeta-green: #31e5c1;
				--zeta-green-highlight: #34fed7;
				--zeta-green_check: rgb(55, 136, 124);
				--zeta-dark-green: #248576;
				--dmt-magenta: #2b294c;
				--dmt-dark-violet: #2e1740;
			}
			img {
				max-width: 100%;
				height: auto;
			}
			a {
				background-color: var(--zeta-green);
				color: green
				
			}
			p code {
				background-color: #0d1117;;
				color: #c9d1d9;
			}
			a p code,
			a code {
				background-color: var(--zeta-green-highlight);
				color: green
			}
			blockquote {
				border-left: 0.25rem solid #3eb0ef;;
				padding-left: 5px;
			}
			p{
				font-size: 1.2rem;
			}
		</style>
	`
		: '';

	const shadow = (node: HTMLDivElement) => {
		shadowroot = node.attachShadow({ mode: 'open' });
		render();
	};

	const render = async () => {
		shadowroot.innerHTML = style + (contentType == 'markdown' ? await getHTML(content) : content);
	};
</script>

<div class="w-full h-full flex flex-col gap-4 overflow-y-auto">
	<h1 class="text-5xl sm:text-6xl font-bold">{title}</h1>
	{#if date}
		<p class="text-base font-light">Published: <span use:timeDelta={{ date }} /></p>
	{/if}
	{#if cover}
		<img src={cover} alt={title} />
	{/if}
	<div class="" use:shadow />
</div>
