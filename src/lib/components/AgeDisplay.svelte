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

<div
	class="age-display flex flex-col items-center justify-center bg-amber-400 p-5 sm:h-20 md:h-25 lg:h-30"
>
	<!-- Scalable Image Based on Age & Gender -->
	<img
		src={getImagePath()}
		alt="Profile Icon"
		class="object-contain sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-50"
	/>
	{#if age == ''}
		<p>Please Select DOB</p>
	{:else}
		<p>Calculated Age: {age}</p>
	{/if}
</div>
