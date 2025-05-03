<script lang="ts">
	import GenderSelector from './GenderSelector.svelte';
	import DOBPicker from './DOBPicker.svelte';
	import AdditionalInfoForm from './AdditionalInfoForm.svelte';
	import AgeDisplay from './AgeDisplay.svelte';
	import VaccineScheduleTable from './VaccineScheduleTable.svelte';

	let gender: 'male' | 'female' | '' = '';
	let dob: string = '';
	let info: string[][] = [];
	let age: string = '';
	let schedule = ['birth', '2mon', '4mon', '6mon', '9mon'];

	function calculateAge(dobStr: string) {
		const birthDate = new Date(dobStr);
		const now = new Date();
		const diff = now.getFullYear() - birthDate.getFullYear();
		age = `${diff}`; // You can enhance this to show months/days too
	}
</script>

<div class="flex items-center justify-center bg-orange-600 sm:h-48 md:h-64 lg:h-80">
	<GenderSelector selectedGender={gender} onGenderChange={(g) => (gender = g)} />
	<DOBPicker
		{dob}
		onDOBChange={(d) => {
			dob = d;
			calculateAge(d);
		}}
	/>
	<AdditionalInfoForm {info} onInfoChange={(val) => (info = val)} />
	<AgeDisplay {age} {gender} />
	<VaccineScheduleTable {schedule} />
</div>
