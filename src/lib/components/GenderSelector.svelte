<script lang="ts">
	export let selectedGender: 'male' | 'female' | '' = '';
	export let onGenderChange: (gender: 'male' | 'female') => void;

	function selectGender(gender: 'male' | 'female') {
		selectedGender = gender;
		onGenderChange?.(gender);
	}
</script>

<div class="gender-selector bg-red-400">
	<button on:click={() => selectGender('male')} aria-label="Select Male">👨</button>
	<button on:click={() => selectGender('female')} aria-label="Select Female">👩</button>
</div>
