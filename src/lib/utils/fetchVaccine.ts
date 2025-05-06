export default async function fetchVaccine(
	age: string,
	gender: 'male' | 'female' | '',
	infoDiseases: { label: string; value: string }[][],
	infoMedications: { label: string; value: string }[][],
	infoOccupations: { label: string; value: string }[][]
) {
	if (!age || !gender || !infoDiseases || !infoMedications || !infoOccupations) {
		throw new Error('Invalid Request');
	}

	return await fetch('/api/vaccine', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ age, gender, infoDiseases, infoMedications, infoOccupations })
	});
}
