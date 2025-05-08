<script lang="ts">
	type VaccineEntry = {
		index: number;
		month: string;
		vaccineName: string;
		howItsGiven: string;
		commonSideEffects: string;
		whyItsImportant: string;
	};
	export let schedule: VaccineEntry[];
	export let vaccine_fetched: true | false | 'error' | 'fetching' = false;
	export let attempt: 1 | 2 | 3 = 1;

	$: no_of_month = attempt === 1 ? 12 : attempt === 2 ? 6 : 3;

	// Define table headings
	const headers: string[] = [
		'Index',
		'Vaccine Name',
		'Month',
		"Why it's Important",
		"How it's Given",
		'Common Side Effects'
	];
</script>

<div class="relative !mt-20 w-full overflow-x-auto !pb-20">
	{#if vaccine_fetched == true}
		<h2
			class="mb-2 text-center text-[50px] leading-none font-bold text-white sm:text-[80px] md:text-[100px] lg:text-left"
		>
			Details of the next {no_of_month} months of vaccines are as follows.
		</h2>
		<div class="overflow-y-hidden rounded-lg border border-gray-300">
			<table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
				<thead class=" bg-blue-400 text-black uppercase">
					<tr>
						{#each headers as header}
							<th scope="col" class="!px-6 !py-3 !font-bold">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each schedule as row}
						<tr class="border-b bg-gray-200 !font-bold">
							<td class=" !px-6 !py-4 text-center text-gray-900">{row.index}</td>
							<td class="!px-6 !py-4">{row.vaccineName}</td>
							<td class=" !px-6 !py-4 text-center">{row.month}</td>
							<td class="!px-6 !py-4">{row.whyItsImportant}</td>
							<td class=" !px-6 !py-4">{row.howItsGiven}</td>
							<td class="!px-6 !py-4">{row.commonSideEffects}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if vaccine_fetched == 'error'}
		<h2
			class="mb-2 text-center text-[50px] leading-none font-bold text-white sm:text-[80px] md:text-[100px] lg:text-left"
		>
			Please try Again!
		</h2>
	{/if}

	{#if vaccine_fetched == 'fetching'}
		<div class="flex h-3/6 items-center justify-center">
			<img class="" src="/sonarAPI.gif" alt="Logo" />
		</div>
	{/if}
</div>
