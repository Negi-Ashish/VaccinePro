import type { RequestHandler } from './$types';
import { PERPLEXITYAPI_KEY } from '$env/static/private';
import { successMessage, errorMessage } from '$lib/utils/apiResponseFormat';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { age, gender, infoDiseases, infoMedications, infoOccupations } = await request.json();

		console.log(age, gender, infoDiseases, infoMedications, infoOccupations, PERPLEXITYAPI_KEY);

		return successMessage('API success.');
	} catch (err) {
		console.error('API error:', err);
		return errorMessage('API Failed.');
	}
};

// export const DELETE: RequestHandler = async ({request}) => {
// 	try {
// 		return json({});
// 	} catch (err) {
// 		console.error('Sign-out error:', err);
// 		throw error(500, 'Internal Server Error');
// 	}
// };
