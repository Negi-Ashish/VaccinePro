<script lang="ts">
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';

	// Define table headings
	const headers: string[] = [
		'Index',
		'Vaccine Name',
		'Month',
		"Why it's Important",
		"How it's Given",
		'Common Side Effects'
	];

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

	const generatePDF = () => {
		const pdf = new jsPDF('landscape');
		pdf.text('Vaccine Schedule Report', pdf.internal.pageSize.getWidth() / 2, 10, {
			align: 'center'
		});

		// const logo = new Image();
		// logo.src = '/perplexity.png';
		// logo.onload = () => {
		// 	pdf.addImage(logo, 'PNG', 10, 5, 30, 10); // x, y, width, height
		// 	// then call autoTable
		// };

		const tabledata = schedule.map((item) => [
			item.index,
			item.vaccineName,
			item.month,
			item.whyItsImportant,
			item.howItsGiven,
			item.commonSideEffects
		]);

		// Auto page breaks and table styling

		autoTable(pdf, {
			startY: 20,
			head: [headers],
			body: tabledata,
			styles: {
				fontSize: 10,
				cellWidth: 'wrap',
				cellPadding: 2,
				overflow: 'linebreak' // wrap content
			},
			margin: { top: 20, left: 10, right: 10 },
			tableWidth: 'wrap', // auto-fit the table to the page
			horizontalPageBreak: true, // handles wide tables better
			horizontalPageBreakRepeat: 0, // no header repeat needed for centered layout
			columnStyles: {
				0: { cellWidth: 20 }, // index
				1: { cellWidth: 30 }, // vaccineName
				2: { cellWidth: 20 }, // month
				3: { cellWidth: 100 }, // whyItsImportant
				4: { cellWidth: 30 }, // howItsGiven
				5: { cellWidth: 70 } // howItsGiven
			}
		});

		pdf.save('vaccine_schedule.pdf');
	};
</script>

<div class="relative !mt-20 w-full overflow-x-auto !pb-20">
	{#if vaccine_fetched == true}
		<h2
			class="mb-2 text-center text-[50px] leading-none font-bold text-white sm:text-[80px] md:text-[100px] lg:text-left"
		>
			Details of the next {no_of_month} months of vaccines are as follows.
		</h2>
		<div id="print-section" class="overflow-y-hidden rounded-lg border border-gray-300">
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
		<div class="flex justify-center">
			<button
				on:click={generatePDF}
				class="!mt-5 w-fit cursor-pointer !rounded-2xl bg-blue-300 p-5"
			>
				Download PDF
			</button>
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
