<script lang="ts">
	export let schedule: string[] = ['birth', '2mon', '4mon', '6mon', '9mon'];
	export let vaccine_fetched: Boolean = false;
	// Define table headings
	const headers: string[] = ['Time', 'Vaccine', 'Category', 'Notes'];

	// Define table data as array of objects
	const data = [
		{ time: 'Birth', vaccine: 'BCG', category: 'Live', notes: 'Given at birth' },
		{ time: '6 Weeks', vaccine: 'DTP', category: 'Toxoid', notes: 'First dose' },
		{ time: '10 Weeks', vaccine: 'Polio', category: 'Inactivated', notes: 'Oral drops' },
		{ time: '14 Weeks', vaccine: 'Hep B', category: 'Inactivated', notes: 'Booster' },
		{ time: '9 Months', vaccine: 'Measles', category: 'Live', notes: 'Single dose' }
	];
</script>

<div class="relative !mt-20 w-full overflow-x-auto !pb-20">
	{#if vaccine_fetched}
		<table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
			<thead class="bg-gray-300 text-black uppercase">
				<tr>
					{#each headers as header}
						<th scope="col" class="!px-6 !py-3">{header}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as row}
					<tr class="border-b bg-gray-200">
						<td class="!px-6 !py-4 font-medium text-gray-900 dark:text-white">{row.time}</td>
						<td class="!px-6 !py-4">{row.vaccine}</td>
						<td class="!px-6 !py-4">{row.category}</td>
						<td class="!px-6 !py-4">{row.notes}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
