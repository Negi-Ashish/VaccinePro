<script lang="ts">
	import GenderSelector from './GenderSelector.svelte';
	import DOBPicker from './DOBPicker.svelte';
	import AdditionalInfoForm from './AdditionalInfoForm.svelte';
	import AgeDisplay from './AgeDisplay.svelte';
	import VaccineScheduleTable from './VaccineScheduleTable.svelte';

	let gender: 'male' | 'female' | '' = '';
	let dob: string = '';
	let info: { label: string; value: string }[][] = [
		[
			{ label: 'Python', value: 'Python' },
			{ label: 'TypeScript', value: 'TypeScript' }
		]
	];
	let age: string = '';
	let schedule = ['birth', '2mon', '4mon', '6mon', '9mon'];

	function calculateAge(dobStr: string) {
		const birthDate = new Date(dobStr);
		const now = new Date();
		const diff = now.getFullYear() - birthDate.getFullYear();
		age = `${diff}`; // You can enhance this to show months/days too
	}
</script>

<div class="!px-10 !pt-30">
	<div class="flex justify-between">
		<div class="InputDiv">
			<GenderSelector selectedGender={gender} onGenderChange={(g) => (gender = g)} />
			<DOBPicker
				{dob}
				onDOBChange={(d) => {
					dob = d;
					calculateAge(d);
				}}
			/>
			<AdditionalInfoForm {info} onInfoChange={(val) => (info = val)} />
		</div>
		<div class="OutputDiv bg-amber-950">
			<AgeDisplay {age} {gender} />
			<VaccineScheduleTable {schedule} />
		</div>
	</div>
</div>

<style>
	.InputDiv {
		display: flex;
	}
	.OutputDiv {
		display: flex;
		width: 60%;
	}
</style>
