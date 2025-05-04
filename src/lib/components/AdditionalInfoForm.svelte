<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';
	import { FileText } from 'lucide-svelte';
	import { languages } from '../options';

	export let info: { label: string; value: string }[][] = [
		[
			{ label: 'Python', value: 'Python' },
			{ label: 'TypeScript', value: 'TypeScript' }
		]
	];

	export let onInfoChange: (info: { label: string; value: string }[][]) => void;

	let isModalOpen = false;

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
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
			<div class="relative min-h-[40%] min-w-[40%] flex-col rounded bg-white text-center">
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
				<div class="bg-gray-200 text-left">
					<label for="languages"> What programming languages do you know? </label>
					<MultiSelect
						id="languages"
						options={languages}
						placeholder="Choose languages"
						bind:selected={info[0]}
						on:click={() => onInfoChange(info)}
					>
						<LanguageSlot let:option {option} slot="selected" />
						<LanguageSlot let:option {option} slot="option" />
					</MultiSelect>
				</div>
				<button class="button2 button3 bottom-0 bg-blue-500 p-3" on:click={closeModal}>Apply</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.button2 {
		width: 10rem;
	}
	.button3 {
		border-radius: 10px;
	}
	.info {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
