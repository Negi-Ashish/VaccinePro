<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
	import { Calendar } from 'lucide-svelte';
	export let dob: string = '';
	export let onDOBChange: (date: string) => void;

	let showInput = false;

	function handleDateChange(selectedDates: Date[]) {
		if (selectedDates.length > 0) {
			const date = selectedDates[0];
			// Format as YYYY-MM-DD in local time
			const formatted =
				date.getFullYear() +
				'-' +
				String(date.getMonth() + 1).padStart(2, '0') +
				'-' +
				String(date.getDate()).padStart(2, '0');

			onDOBChange?.(formatted);
			showInput = false;
		}
	}

	function toggleInput() {
		showInput = true;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/carbon-components-svelte/css/white.css" />
</svelte:head>

<div class="calendar rounded-md text-white sm:h-20 md:h-25 lg:h-30">
	{#if showInput}
		<DatePicker
			datePickerType="single"
			value={dob}
			flatpickrProps={{
				locale: { firstDayOfWeek: 1 },
				defaultDate: dob,
				dateFormat: 'Y-m-d',
				onChange: handleDateChange
			}}
		>
			<DatePickerInput labelText="Date of Birth" placeholder="mm/dd/yyyy" defaultValue={dob} />
		</DatePicker>
	{:else}
		<button
			type="button"
			class="calendar cursor-pointer bg-purple-400 hover:bg-purple-500 focus:outline-none"
			on:click={toggleInput}
		>
			<Calendar class="h-15 w-15" />
		</button>
	{/if}
</div>

<style>
	button {
		width: 10rem;
	}
	.calendar {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
