<script lang="ts">
	export let selectedGender: 'male' | 'female' | '' = '';
	export let onGenderChange: (gender: 'male' | 'female') => void;

	function selectGender(gender: 'male' | 'female') {
		selectedGender = gender;
		onGenderChange?.(gender);
	}
</script>

<div class="gender-selector sm:h-20 md:h-25 lg:h-30">
	<button
		class="flex flex-col p-5 text-5xl hover:bg-green-300"
		class:bg-green-500={selectedGender === 'male'}
		class:bg-blue-400={selectedGender !== 'male'}
		on:click={() => selectGender('male')}
		id={'male'}
		aria-label="Select Male"
		>👨
	</button>

	<button
		class=" p-5 text-5xl hover:bg-green-300"
		class:bg-green-500={selectedGender === 'female'}
		class:bg-red-400={selectedGender !== 'female'}
		on:click={() => selectGender('female')}
		aria-label="Select Female">👩</button
	>
</div>

<style>
	.gender-selector {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
