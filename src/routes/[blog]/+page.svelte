<script lang="ts">
	import Render from '$lib/render.svelte';

import type { PageData } from './$types';

	export let data: PageData
</script>

<div class="w-full h-full flex flex-col">
	<Render content={data.content} />
</div>
