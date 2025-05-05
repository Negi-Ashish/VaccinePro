<script lang="ts">
	import { Syringe } from 'lucide-svelte';

	export let infoDiseases: { label: string; value: string }[][] = [[]];
	export let infoMedications: { label: string; value: string }[][] = [[]];
	export let infoOccupations: { label: string; value: string }[][] = [[]];
	export let selectedGender: 'male' | 'female' | '' = '';
	export let age: string = '';
	export let additionalInfoVisited: boolean = false;

	let vaccinesFetched: boolean = false;

	function calculateVaccine() {
		console.log('age', age);
		console.log('selectedGender', selectedGender);
		console.log('infoDiseases', infoDiseases);
		console.log('infoMedications', infoMedications);
		console.log('infoOccupations', infoOccupations);
		vaccinesFetched = true;
	}
</script>

<div class="info calendar2 ml-0 w-48 lg:!ml-4 lg:w-full">
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
	}
	.text-green {
		color: green;
	}
</style>
