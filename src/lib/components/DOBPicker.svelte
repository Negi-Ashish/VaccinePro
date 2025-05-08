<script lang="ts">
	import { DatePicker, DatePickerInput, Modal } from 'carbon-components-svelte';
	import { Calendar } from 'lucide-svelte';
	export let dob: string = '';
	export let onDOBChange: (date: string) => void;
	export let selectedGender: 'male' | 'female' | '' = '';
	export let vaccine_fetched: true | false | 'error' | 'fetching' = false;

	let showModal = false;

	$: isDisabled = selectedGender == '' || dob !== '';
	$: stateClass =
		selectedGender === ''
			? 'no-gender-selected'
			: dob === ''
				? 'not-selected-text'
				: vaccine_fetched == 'fetching' || vaccine_fetched == false
					? 'selected-text'
					: vaccine_fetched == 'error'
						? '!text-red-500'
						: '!text-yellow-400';

	function handleDateChange(selectedDates: Date[]) {
		if (selectedDates.length > 0) {
			const date = selectedDates[0];
			const formatted =
				date.getFullYear() +
				'-' +
				String(date.getMonth() + 1).padStart(2, '0') +
				'-' +
				String(date.getDate()).padStart(2, '0');

			onDOBChange?.(formatted);
			showModal = false;
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/carbon-components-svelte/css/white.css" />
</svelte:head>

<div class={`calendar calendar2 ml-0 w-48  lg:!ml-4 lg:w-full ${stateClass}`}>
	<button
		type="button"
		class="calendar cursor-pointer focus:outline-none"
		on:click={() => (showModal = true)}
		disabled={isDisabled}
	>
		<Calendar class="h-15 w-15" />
		<p>DOB</p>
	</button>
</div>

{#if showModal}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-start justify-center bg-gray-800 !pt-30">
		<div class="rounded-lg shadow-lg">
			<DatePicker
				datePickerType="single"
				value={dob}
				flatpickrProps={{
					locale: { firstDayOfWeek: 1 },
					defaultDate: dob,
					dateFormat: 'Y-m-d',
					maxDate: new Date(),
					onChange: handleDateChange
				}}
			>
				<DatePickerInput labelText="Date of Birth" placeholder="mm/dd/yyyy" defaultValue={dob} />
			</DatePicker>
		</div>
	</div>
{/if}

<style>
	button {
		width: 7rem;
	}
	.calendar {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	:disabled {
		cursor: not-allowed;
	}
	.calendar2 {
		border: dotted;
		border-radius: 2rem;
		border-color: black;
	}
	.no-gender-selected {
		color: gray;
	}
	.no-gender-selected:disabled {
		color: gray;
	}
	.not-selected-text {
		color: white;
	}
	.not-selected-text:disabled {
		color: gray;
	}
	.not-selected-text:hover {
		color: black;
	}
	.selected-text {
		color: green;
	}
	.selected-text:disabled {
		color: green;
	}
</style>
