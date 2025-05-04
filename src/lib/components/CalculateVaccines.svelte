<script lang="ts">
	import { Syringe } from 'lucide-svelte';

	export let infoDiseases: { label: string; value: string }[][] = [[]];
	export let infoMedications: { label: string; value: string }[][] = [[]];
	export let infoOccupations: { label: string; value: string }[][] = [[]];
	export let selectedGender: 'male' | 'female' | '' = '';
	export let dob: string = '';
	export let additionalInfoVisited: boolean = false;

	let vaccinesFetched: boolean = false;

	function calculateVaccine() {
		console.log('Call API');
		vaccinesFetched = true;
	}
</script>

<div class="info calendar2 sm:h-20 md:h-25 lg:h-30">
	<button
		class={`info button2 can-select-text flex-col ${vaccinesFetched ? 'text-green' : ''} `}
		on:click={calculateVaccine}
		aria-label="Open additional info"
		disabled={!additionalInfoVisited}
	>
		<Syringe class="h-15 w-15" />
		<p>Get Vaccines</p>
	</button>
</div>

<style>
	.button2 {
		width: 7rem;
		cursor: pointer;
	}

	.info {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.can-select-text {
		color: white;
	}

	:disabled {
		color: gray;
		cursor: not-allowed;
	}
	.calendar2 {
		border: dotted;
		border-radius: 2rem;
		border-color: black;
		margin-left: 1rem;
	}
	.text-green {
		color: green;
	}
</style>
