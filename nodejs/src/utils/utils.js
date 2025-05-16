export const extractCustomerData = async ({ input, client, isImage = false }) => {
	const systemMessage = {
		role: 'system',
		content: [
			{
				type: 'input_text',
				text: 'You are an assistant that extracts customer contact information from messages or images. Always return a JSON object with this exact structure:\n\n{\n  "name": "",\n  "phone": "",\n  "address": {\n    "street1": "",\n    "street2": "",\n    "city": "",\n    "state": "",\n    "zip_code": ""\n  }\n}\n\nIf any information is missing from the input, return an empty string for that field. Do not remove any fields from the JSON.\nUse your knowledge to infer missing state or ZIP code if possible. If not, leave them as empty strings.\n',
			},
		],
	};
	const messages = isImage
		? {
				role: 'user',
				content: [
					{
						type: 'input_image',
						image_url: input,
					},
				],
		  }
		: {
				role: 'user',
				content: [
					{
						type: 'input_text',
						text: input,
					},
				],
		  };
	try {
		const response = await client.responses.create({
			model: 'gpt-4.1-nano',
			input: [systemMessage, messages],
			text: {
				format: {
					type: 'json_object',
				},
			},
			temperature: 0,
			max_output_tokens: 500,
			top_p: 1,
			store: false,
		});

		const responseText = response.output_text;
		// Убираем форматирование Markdown (на всякий случай)
		const cleaned = responseText.replace(/```json\s*|```/g, '').trim();
		const result = JSON.parse(cleaned);
		return result;
	} catch (err) {
		console.error('Failed to parse ChatGPT response:', err);
		return {
			name: '',
			phone: '',
			address: {
				street1: '',
				street2: '',
				city: '',
				state: '',
				zip_code: '',
			},
		};
	}
};

export const generateResponseFromText = async (message, client) => {
	return await extractCustomerData({ input: message, client, isImage: false });
};

export const generateResponseFromImage = async (image, client) => {
	return await extractCustomerData({ input: image, client, isImage: true });
};

export const bigIntToString = (obj) => {
	if (Array.isArray(obj)) {
		return obj.map(bigIntToString); // Рекурсивно применяем к массивам
	} else if (obj !== null && typeof obj === 'object') {
		return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, typeof value === 'bigint' ? value.toString() : bigIntToString(value)]));
	}
	return obj; // Возвращаем другие значения без изменений
};
