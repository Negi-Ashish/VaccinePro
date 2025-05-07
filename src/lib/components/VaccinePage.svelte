<script lang="ts">
	import GenderSelector from './GenderSelector.svelte';
	import DOBPicker from './DOBPicker.svelte';
	import AdditionalInfoForm from './AdditionalInfoForm.svelte';
	import AgeDisplay from './AgeDisplay.svelte';
	import VaccineScheduleTable from './VaccineScheduleTable.svelte';
	import CalculateVaccines from './CalculateVaccines.svelte';
	// backend calls
	import fetchVaccine from '$lib/utils/fetchVaccine';

	type VaccineEntry = {
		index: number;
		month: string;
		vaccineName: string;
		howItsGiven: string;
		commonSideEffects: string;
		whyItsImportant: string;
	};

	let gender: 'male' | 'female' | '' = '';
	let dob: string = '';
	let infoDiseases: { label: string; value: string }[][] = [];
	let infoMedications: { label: string; value: string }[][] = [];
	let infoOccupations: { label: string; value: string }[][] = [];
	let additionalInfoVisited: boolean = false;
	let age: string = '';
	let schedule: VaccineEntry[] = [];
	let vaccine_fetched: true | false | 'error' | 'fetching' = false;
	let attempt: 1 | 2 | 3 = 1;

	function calculateAge(dobStr: string) {
		const birthDate = new Date(dobStr);
		const now = new Date();
		const diff = now.getFullYear() - birthDate.getFullYear();
		age = `${diff}`; // You can enhance this to show months/days too
	}

	async function calculateVaccine() {
		vaccine_fetched = 'fetching';
		try {
			const response = await fetchVaccine(
				age,
				gender,
				infoDiseases,
				infoMedications,
				infoOccupations
			);

			let rest = await response.json();
			schedule = rest.payload;
			if (rest.isSuccessful) {
				vaccine_fetched = true;
				attempt = rest.attempt;
			} else {
				vaccine_fetched = 'error';
			}
		} catch (error) {
			vaccine_fetched = 'error';
			console.log('FE Error', error);
		}
	}
</script>

<div class="!px-10 !pt-8 md:!pt-30">
	<div class="flex flex-col justify-between !space-y-8 lg:flex-row lg:!space-y-0">
		<div
			class="flex flex-col items-center justify-center !space-y-8 lg:flex-row lg:items-stretch lg:!space-y-0"
		>
			<GenderSelector selectedGender={gender} onGenderChange={(g) => (gender = g)} />
			<DOBPicker
				{dob}
				selectedGender={gender}
				onDOBChange={(d) => {
					dob = d;
					calculateAge(d);
				}}
			/>
			<AdditionalInfoForm
				{infoDiseases}
				{infoMedications}
				{infoOccupations}
				{dob}
				{additionalInfoVisited}
				onInfoChange={(val) => (infoDiseases = val)}
				onMedicationChange={(val) => (infoMedications = val)}
				onOccupationChange={(val) => (infoOccupations = val)}
				onAdditionalModalOpen={(val) => (additionalInfoVisited = val)}
			/>
			<CalculateVaccines {additionalInfoVisited} {calculateVaccine} {vaccine_fetched} />
		</div>
		<div class="flex flex-col !space-y-8 lg:flex-row lg:!space-y-0">
			<AgeDisplay {age} {gender} />
		</div>
	</div>
	<VaccineScheduleTable {schedule} {vaccine_fetched} {attempt} />
</div>

<style>
</style>
