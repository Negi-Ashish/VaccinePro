<script lang="ts">
	interface Human {
		name: string;
		hands: number;
		legs: number;
	}
	export let human: Human;
</script>

<div>
	<h1>{human.name}</h1>
	<h1>{human.hands}</h1>
	<h1>{human.legs}</h1>
</div>
