<script lang="ts">
	export let selectedGender: 'male' | 'female' | '' = '';
	export let onGenderChange: (gender: 'male' | 'female') => void;

	function selectGender(gender: 'male' | 'female') {
		selectedGender = gender;
		onGenderChange?.(gender);
	}
</script>

<div class="gender-selector flex items-center justify-center sm:h-20 md:h-25 lg:h-30">
	<button
		class="gender-selector bg-red-400 p-5 text-5xl sm:h-20 md:h-25 lg:h-30"
		on:click={() => selectGender('male')}
		aria-label="Select Male">👨</button
	>
	<button
		class="gender-selector bg-blue-400 p-5 text-5xl sm:h-20 md:h-25 lg:h-30"
		on:click={() => selectGender('female')}
		aria-label="Select Female">👩</button
	>
</div>

<style>
	button {
		width: 10rem;
	}
	.gender-selector {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
