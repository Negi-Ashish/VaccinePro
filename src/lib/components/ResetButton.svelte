<script lang="ts">
	import { RotateCcw } from 'lucide-svelte';
	export let Reset: () => void;
	export let vaccine_fetched: true | false | 'error' | 'fetching' = false;
</script>

<div class=" calendar2 ml-0 flex w-48 items-center justify-center lg:!ml-5 lg:w-full lg:!p-4">
	<button
		type="button"
		class={`cursor-pointer ${vaccine_fetched == 'error' ? 'text-green-500' : 'text-white hover:text-black '}`}
		on:click={() => Reset()}
		disabled={vaccine_fetched == 'fetching'}
	>
		<RotateCcw class="h-15 w-15" />
		<p>Reset</p>
	</button>
</div>

<style>
	.calendar2 {
		border: dotted;
		border-radius: 2rem;
		border-color: black;
	}
	:disabled {
		color: grey;
		cursor: not-allowed;
	}
</style>
