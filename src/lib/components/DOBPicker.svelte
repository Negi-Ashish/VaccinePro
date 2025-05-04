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

<div
	class="calendar flex items-center justify-center rounded-md bg-purple-400 sm:h-20 md:h-25 lg:h-30"
>
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
			class="flex cursor-pointer items-center gap-2 border-none bg-transparent text-white"
			on:click={toggleInput}
		>
			<Calendar class="h-10 w-10" />
		</button>
	{/if}
</div>

<style>
	.calendar {
		padding-inline: 50px;
	}
</style>
