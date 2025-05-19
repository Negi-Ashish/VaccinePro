import type { RequestHandler } from './$types';
import { PERPLEXITYAPI_KEY } from '$env/static/private';
import { successMessage, errorMessage } from '$lib/utils/apiResponseFormat';
import { jsonSchema_1, jsonSchema_2, jsonSchema_3 } from '$lib/constants/jsonSchema';
// import { writeFile } from 'fs/promises';
// import path from 'path';

type VaccineEntry = {
	index: number;
	month: string;
	vaccineName: string;
	howItsGiven: string;
	commonSideEffects: string;
	whyItsImportant: string;
};

export const POST: RequestHandler = async ({ request }) => {
	const { age, gender, infoDiseases, infoMedications, infoOccupations } = await request.json();

	const infoDiseases_values = infoDiseases[0].map((item: { value: string }) => item.value);
	const infoMedications_values = infoMedications[0].map((item: { value: string }) => item.value);
	const infoOccupations_values = infoOccupations[0].map((item: { value: string }) => item.value);

	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			const response_function = await getVaccineSchedule(
				age,
				gender,
				infoOccupations_values,
				infoMedications_values,
				infoDiseases_values,
				attempt
			);
			console.log('response_function', response_function);
			const flatList = flattenVaccinePayloadWithMonths(response_function);
			// console.log('response_function', response_function);
			return successMessage(flatList, attempt);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			if (err.name === 'AbortError') {
				console.error('Request timed out or was aborted');
			} else {
				console.error(`Attempt ${attempt} failed:`, err);
				if (attempt === 3) {
					return errorMessage('API failed after 3 attempts.');
				}
				await new Promise((resolve) => setTimeout(resolve, 2000));
			}
		}
	}
	return errorMessage('Unexpected error.');
};

async function getVaccineSchedule(
	age: number,
	gender: string,
	occupation: string[],
	pastMedications: string[],
	pastDiseases: string[],
	attempt: number
): Promise<
	Record<
		string,
		{
			vaccines: string[];
			details: {
				howItsGiven: string;
				commonSideEffects: string;
				whyItsImportant: string;
			}[];
		}
	>
> {
	const last_month = attempt === 1 ? '12th_Month' : attempt === 2 ? '6th_Month' : '3rd_Month';
	const jsonSchema = attempt === 1 ? jsonSchema_1 : attempt === 2 ? jsonSchema_2 : jsonSchema_3;
	const apiKey = PERPLEXITYAPI_KEY; // Securely store your API key
	const url = 'https://api.perplexity.ai/chat/completions';

	const occupation_string = JSON.stringify(occupation);
	const past_medications_string = JSON.stringify(pastMedications);
	const past_diseases_string = JSON.stringify(pastDiseases);

	// Construct the user prompt including patient details and output instructions
	const userPrompt = `
        Given a patient who is a ${age}-year-old ${gender} 
		${occupation_string === '[]' ? '' : `working as ${occupation_string}`} 
		${past_medications_string == '[]' ? '' : `with past medications ${past_medications_string}`} 
		${past_diseases_string == '[]' ? '' : `and past diseases ${past_diseases_string}`}, generate a vaccination schedule.
		If the patient's age is 0, treat them as a newborn and include all vaccines typically 
		administered at birth (e.g., BCG, OPV, Hepatitis B) based on standard national immunization guidelines.
		For adults, consider age-specific recommendations such as flu, Tdap booster, shingles, HPV, travel-related, 
		or occupational vaccines.
		Tailor recommendations based on medical history, occupation (e.g., healthcare, lab worker, traveler), 
		and risk factors (e.g., chronic diseases).
        The output must be a valid JSON object with keys "1st_Month", "2nd_Month", ..., up to "${last_month}". 
        Each key represents a month of the schedule. The schedule can cover up to 12 months; 
        if a shorter schedule is needed (such as 6 or 3 months), include only those months. 
		Each month key should map to an object following the Plexity API schema. 
        Each month object must contain two fields: "vaccines" and "details". 
		The "vaccines" field should be an array of vaccine name strings. 
		The "details" field should be an array of objects with additional information for each vaccine. 
        Each object in the "details" array must include the following fields exactly: "howItsGiven", "commonSideEffects", "whyItsImportant". 
        All fields are required. Use concise, consistent terms (for example, use "IM" instead of "Intramuscular injection"). 
        Include every month from the first to the last. Ensure that each month has either vaccine recommendations or a valid empty structure. 
		If a month has no recommended vaccines, include it with an empty "vaccines" array and an empty "details" array. 
        Return only valid JSON matching the described schema. Do not include citation markers like [1], [2], 
		or reference numbers in any field or any additional text or explanation.`;

	// Prepare the API request payload
	console.log('User Prompt', userPrompt.trim());
	const payload = {
		model: 'sonar-pro', // use the Sonar Pro model:contentReference[oaicite:0]{index=0}
		messages: [
			{
				role: 'system',
				content: `You are a licensed medical doctor and vaccine expert. Provide accurate, up-to-date, 
					and concise medical advice based on established health guidelines. Respond in a clear, reassuring, and professional tone.`
			},
			{ role: 'user', content: userPrompt.trim() }
		],
		response_format: {
			// enforce structured JSON output:contentReference[oaicite:1]{index=1}
			type: 'json_schema',
			json_schema: jsonSchema
		},
		max_tokens: 10000, // allow enough length for the full schedule:contentReference[oaicite:2]{index=2}
		temperature: 0.0, // low randomness for deterministic, factual output:contentReference[oaicite:3]{index=3}
		top_p: 1.0, // use full probability mass to reduce randomness:contentReference[oaicite:4]{index=4}
		top_k: 1, // consider only the most likely token at each step to be deterministic:contentReference[oaicite:5]{index=5}
		frequency_penalty: 0, // discourage repetition (default is 1):contentReference[oaicite:6]{index=6}
		presence_penalty: 0, // default value; no extra emphasis on new topics
		search_domain_filter: ['cdc.gov', 'who.int', 'mayoclinic.org', 'unicef.org', 'nhm.gov.in']
	};

	// For increasing seconds of wait
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 180000); // 180 seconds timeout

	// Make the HTTP POST request
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}` // use Bearer token from environment:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}
		},
		body: JSON.stringify(payload),
		signal: controller.signal
	});
	clearTimeout(timeout); // clear if successful
	const result = await response.json();
	const content = result.choices[0].message.content;

	try {
		// Safely parse the JSON content:contentReference[oaicite:9]{index=9}
		// console.log('content', content);
		return JSON.parse(content);
	} catch (err) {
		// const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		// const filename = path.join('/tmp', `failed-response-${timestamp}.txt`);
		// await writeFile(filename, content, 'utf8');

		throw new Error('Failed to parse JSON from Perplexity API: ' + err);
	}
}

function flattenVaccinePayloadWithMonths(
	rawPayload: Record<
		string,
		{
			vaccines: string[];
			details: {
				howItsGiven: string;
				commonSideEffects: string;
				whyItsImportant: string;
			}[];
		}
	>
): VaccineEntry[] {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const currentMonthIndex = new Date().getMonth(); // 0 = January

	const monthKeys = Array.from({ length: 12 }, (_, i) => {
		const num = i + 1;
		if (num === 1) return '1st_Month';
		if (num === 2) return '2nd_Month';
		if (num === 3) return '3rd_Month';
		return `${num}th_Month`;
	});

	const result: VaccineEntry[] = [];
	let index = 1;

	monthKeys.forEach((key, i) => {
		const entry = rawPayload[key];
		if (!entry) return;

		const readableMonth = monthNames[(currentMonthIndex + i) % 12];
		const { vaccines, details } = entry;

		for (let j = 0; j < vaccines.length; j++) {
			const detail = details[j] || {
				howItsGiven: '',
				commonSideEffects: '',
				whyItsImportant: ''
			};

			result.push({
				index: index++,
				month: readableMonth,
				vaccineName: vaccines[j],
				howItsGiven: detail.howItsGiven,
				commonSideEffects: detail.commonSideEffects,
				whyItsImportant: detail.whyItsImportant
			});
		}
	});

	return result;
}
