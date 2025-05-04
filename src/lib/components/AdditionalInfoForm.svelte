<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';
	import { FileText } from 'lucide-svelte';
	import { diseases, medications, occupations } from '../options';

	export let infoDiseases: { label: string; value: string }[][] = [[]];
	export let infoMedications: { label: string; value: string }[][] = [];
	export let infoOccupations: { label: string; value: string }[][] = [];

	export let onInfoChange: (infoDiseases: { label: string; value: string }[][]) => void;
	export let onMedicationChange: (infoMedications: { label: string; value: string }[][]) => void;
	export let onOccupationChange: (infoOccupations: { label: string; value: string }[][]) => void;

	let isModalOpen = false;

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}

	function handleClickDiseases(): void {
		if (infoDiseases.length < 5) {
			console.log('infoDiseases', infoDiseases);
			onInfoChange(infoDiseases);
		} else {
			console.log('List already contains 5 items, cannot add more.');
		}
	}

	function handleClickMedication(): void {
		if (infoMedications.length < 5) {
			console.log('infoMedications', infoMedications);
			onMedicationChange(infoMedications);
		} else {
			console.log('List already contains 5 items, cannot add more.');
		}
	}

	function handleClickOccupation(): void {
		if (infoMedications.length < 5) {
			console.log('infoOccupations', infoOccupations);
			onOccupationChange(infoOccupations);
		} else {
			console.log('List already contains 5 items, cannot add more.');
		}
	}
</script>

<div class="info sm:h-20 md:h-25 lg:h-30">
	<button
		class="info button2 cursor-pointer flex-col text-white hover:text-black focus:outline-none"
		on:click={openModal}
		aria-label="Open additional info"
	>
		<FileText class="h-15 w-15" />
		<p>Additional Info</p>
	</button>

	{#if isModalOpen}
		<div class=" bg-opacity-50 info fixed inset-0 z-50 bg-gray-800">
			<div
				class="relative min-h-[40%] max-w-[40%] min-w-[40%] flex-col rounded bg-white text-center"
			>
				<h4 class="text-lg font-bold">Provide Additional Information</h4>
				<div class="absolute top-0 right-0">
					<button
						class=" ml-auto w-auto text-gray-500 hover:text-gray-700"
						on:click={closeModal}
						aria-label="Close modal"
					>
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div class=" p-4 text-left">
					<div class="!space-y-10">
						<div class=" bg-gray-200">
							<label for="diseases" class="cursor-pointer text-lg text-blue-500"
								>Add a known disease.</label
							>

							<MultiSelect
								id="diseases"
								options={diseases}
								placeholder="Choose Disease"
								bind:selected={infoDiseases[0]}
								maxSelect={5}
								on:add={handleClickDiseases}
								style="cursor: pointer;"
							>
								<LanguageSlot let:option {option} slot="selected" />
								<LanguageSlot let:option {option} slot="option" />
							</MultiSelect>
						</div>

						<div class=" bg-gray-200">
							<label for="medications" class="cursor-pointer text-lg text-blue-500"
								>Add medications.</label
							>
							<MultiSelect
								id="medications"
								options={medications}
								placeholder="Choose Medications"
								bind:selected={infoMedications[0]}
								maxSelect={5}
								on:add={handleClickMedication}
								style="cursor: pointer;"
							>
								<LanguageSlot let:option {option} slot="selected" />
								<LanguageSlot let:option {option} slot="option" />
							</MultiSelect>
						</div>

						<div class=" bg-gray-200">
							<label for="occupations" class="cursor-pointer text-lg text-blue-500"
								>Add occupations.</label
							>
							<MultiSelect
								id="occupations"
								options={occupations}
								placeholder="Choose Occupations"
								bind:selected={infoOccupations[0]}
								maxSelect={5}
								on:add={handleClickOccupation}
								style="cursor: pointer;"
							>
								<LanguageSlot let:option {option} slot="selected" />
								<LanguageSlot let:option {option} slot="option" />
							</MultiSelect>
						</div>
					</div>
				</div>
				<button
					class="button2 button3 bottom-0 cursor-pointer bg-blue-500 p-3 hover:bg-blue-600"
					on:click={closeModal}>Apply</button
				>
				<button
					class="button2 button3 bottom-0 cursor-pointer bg-blue-500 p-3 hover:bg-blue-600"
					on:click={closeModal}>Skip</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.button2 {
		width: 7rem;
	}
	.button3 {
		border-radius: 10px;
		margin-top: 3rem;
	}
	.info {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
