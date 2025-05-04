<script lang="ts">
	import { Mars, Venus } from 'lucide-svelte';
	export let selectedGender: 'male' | 'female' | '' = '';
	export let onGenderChange: (gender: 'male' | 'female') => void;

	function selectGender(gender: 'male' | 'female') {
		selectedGender = gender;
		onGenderChange?.(gender);
	}
</script>

<div class="gender-selector sm:h-20 md:h-25 lg:h-30">
	<button
		type="button"
		class={`calendar cursor-pointer   
    ${selectedGender === 'male' ? 'selected-text' : 'text-white hover:text-black'}`}
		on:click={() => selectGender('male')}
	>
		<Mars class="h-15 w-15" />
		<p>Male</p>
	</button>

	<button
		type="button"
		class={`calendar cursor-pointer  
    ${selectedGender === 'female' ? 'selected-text' : 'text-white hover:text-black'}`}
		on:click={() => selectGender('female')}
	>
		<Venus class="h-15 w-15" />
		<p>Female</p>
	</button>
</div>

<style>
	.gender-selector {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: dotted;
		border-radius: 2rem;
	}
	.selected-text {
		color: green;
	}
</style>
