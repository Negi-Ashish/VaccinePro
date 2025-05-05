<script lang="ts">
	import GenderSelector from './GenderSelector.svelte';
	import DOBPicker from './DOBPicker.svelte';
	import AdditionalInfoForm from './AdditionalInfoForm.svelte';
	import AgeDisplay from './AgeDisplay.svelte';
	import VaccineScheduleTable from './VaccineScheduleTable.svelte';
	import CalculateVaccines from './CalculateVaccines.svelte';

	let gender: 'male' | 'female' | '' = '';
	let dob: string = '';
	let infoDiseases: { label: string; value: string }[][] = [];
	let infoMedications: { label: string; value: string }[][] = [];
	let infoOccupations: { label: string; value: string }[][] = [];
	let additionalInfoVisited: boolean = false;
	let age: string = '';
	let schedule = ['birth', '2mon', '4mon', '6mon', '9mon'];
	let vaccine_fetched: boolean = false;

	function calculateAge(dobStr: string) {
		const birthDate = new Date(dobStr);
		const now = new Date();
		const diff = now.getFullYear() - birthDate.getFullYear();
		age = `${diff}`; // You can enhance this to show months/days too
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
			<CalculateVaccines
				{infoDiseases}
				{infoMedications}
				{infoOccupations}
				selectedGender={gender}
				{dob}
				{additionalInfoVisited}
			/>
		</div>
		<div class="flex flex-col !space-y-8 lg:flex-row lg:!space-y-0">
			<AgeDisplay {age} {gender} />
		</div>
	</div>
	<VaccineScheduleTable {schedule} {vaccine_fetched} />
</div>

<style>
</style>
