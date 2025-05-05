<script lang="ts">
	export let age: string = '';
	export let gender: string = '';

	function getImagePath(): string {
		const numAge = parseInt(age);
		if (isNaN(numAge)) return '/unknown.png'; // fallback

		if (numAge < 5) {
			return gender === 'male' ? '/baby-boy.png' : '/baby-girl.png';
		} else if (numAge < 18) {
			return gender === 'male' ? '/boy.png' : '/girl.png';
		} else {
			return gender === 'male' ? '/man.png' : '/woman.png';
		}
	}
</script>

<div class="age-display flex flex-col items-center justify-center p-5 text-white">
	<!-- Scalable Image Based on Age & Gender -->
	<img
		src={getImagePath()}
		alt="Profile Icon"
		class="h-20 w-20 object-contain md:h-16 md:w-16 lg:h-20 lg:w-50"
	/>
	{#if age == ''}
		<p>Please Select DOB</p>
	{:else}
		<p>Calculated Age: {age}</p>
	{/if}
</div>
