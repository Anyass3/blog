<script>
	let { id = '', type = 'text', label = 'Text', required = false, name = '' } = $props();
</script>

<label
	for={id}
	class="relative block overflow-hidden border-b border-[--normal] bg-transparent pt-3 focus-within:border-[--primary] focus-within:text-[--primary] font-medium"
>
	<input
		{type}
		{id}
		{required}
		name={name || label.toLowerCase()}
		placeholder={label}
		class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
	/>

	<span
		class="absolute start-0 top-2 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
	>
		{label}
		{required ? '*' : ''}
	</span>
</label>
