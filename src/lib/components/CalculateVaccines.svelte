<script lang="ts">
	import { Syringe } from 'lucide-svelte';

	// export let infoDiseases: { label: string; value: string }[][] = [[]];
	// export let infoMedications: { label: string; value: string }[][] = [[]];
	// export let infoOccupations: { label: string; value: string }[][] = [[]];
	// export let selectedGender: 'male' | 'female' | '' = '';
	// export let age: string = '';
	export let additionalInfoVisited: boolean = false;
	export let calculateVaccine: () => Promise<void>;
	export let vaccine_fetched: true | false | 'error' | 'fetching' = false;

	$: isDisabled =
		!additionalInfoVisited || vaccine_fetched === 'fetching' || vaccine_fetched === true;
	$: stateClass =
		vaccine_fetched === 'fetching'
			? 'text-green'
			: vaccine_fetched == true
				? '!text-yellow-400'
				: vaccine_fetched == 'error'
					? '!text-red-500'
					: 'text-white hover:text-black';

	async function calculateVaccineX() {
		await calculateVaccine();
	}
</script>

<div class="info calendar2 ml-0 w-48 lg:!ml-4 lg:w-full">
	<button
		class={`info button2  flex-col ${stateClass} `}
		on:click={calculateVaccineX}
		aria-label="Open additional info"
		disabled={isDisabled}
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
