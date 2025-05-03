<script lang="ts">
	export let dob: string = '';
	export let onDOBChange: (date: string) => void;

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		onDOBChange?.(target.value);
	}
</script>

<div class="relative bg-purple-400">
	<input
		id="dob"
		type="date"
		bind:value={dob}
		on:input={handleChange}
		class="absolute inset-0 opacity-0"
	/>
	<label for="dob" class="cursor-pointer text-lg text-gray-500">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 7V3m0 0H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-3m-6 0h6m-6 0V7"
			/>
		</svg>
	</label>
</div>
