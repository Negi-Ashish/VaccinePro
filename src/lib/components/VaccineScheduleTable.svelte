<script lang="ts">
	export let schedule: string[] = ['birth', '2mon', '4mon', '6mon', '9mon'];
</script>

<div class="vaccine-table bg-lime-400 p-5 sm:h-20 md:h-25 lg:h-30">
	<h3>Vaccine description based on provided criteria</h3>
	<table>
		<thead>
			<tr>
				{#each schedule as time}
					<th>{time}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<tr>
				{#each schedule as _}
					<td>Vaccine Info</td> <!-- Replace with dynamic data -->
				{/each}
			</tr>
		</tbody>
	</table>
</div>
