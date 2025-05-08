<script lang="ts">
	import { Mars, Venus } from 'lucide-svelte';
	export let selectedGender: 'male' | 'female' | '' = '';
	export let vaccine_fetched: true | false | 'error' | 'fetching' = false;
	export let onGenderChange: (gender: 'male' | 'female') => void;

	$: stateClassMale = [
		selectedGender === 'male'
			? vaccine_fetched == 'fetching' || vaccine_fetched == false
				? 'selected-text'
				: vaccine_fetched == 'error'
					? '!text-red-500'
					: '!text-yellow-400'
			: '',
		selectedGender === '' && 'text-white hover:text-black',
		selectedGender === 'female' && 'text-gray-500'
	]
		.filter(Boolean)
		.join(' ');

	$: stateClassFemale = [
		selectedGender === 'female'
			? vaccine_fetched == 'fetching' || vaccine_fetched == false
				? 'selected-text'
				: vaccine_fetched == 'error'
					? '!text-red-500'
					: '!text-yellow-400'
			: '',
		selectedGender === '' && 'text-white hover:text-black',
		selectedGender === 'male' && 'text-gray-500'
	]
		.filter(Boolean)
		.join(' ');

	function selectGender(gender: 'male' | 'female') {
		selectedGender = gender;
		onGenderChange?.(gender);
	}
</script>

<div class="gender-selector flex w-48 items-center justify-center lg:w-full">
	<button
		type="button"
		class={` cursor-pointer ${stateClassMale}`}
		on:click={() => selectGender('male')}
		disabled={selectedGender !== ''}
	>
		<Mars class="h-15 w-15" />
		<p>Male</p>
	</button>

	<button
		type="button"
		class={` cursor-pointer ${stateClassFemale}`}
		on:click={() => selectGender('female')}
		disabled={selectedGender !== ''}
	>
		<Venus class="h-15 w-15" />
		<p>Female</p>
	</button>
</div>

<style>
	.gender-selector {
		border: dotted;
		border-radius: 2rem;
	}
	.selected-text {
		color: green;
	}
	button:disabled {
		cursor: not-allowed;

		opacity: 1; /* prevent greying out */
	}
</style>
