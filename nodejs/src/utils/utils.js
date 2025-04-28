export const generateResponse = async (message, client) => {
	const prompt = `
      "${message}"
      Please extract name, phone (if present), and address and return JSON in format 
      {
         "name": "",
         "phone": "",
         "address": {
            "street1": "",
            "street2": "",
            "city": "",
            "state": "",
            "zip_code": ""
         }
      }
      and define state as 2 letters and zip_code if not present.
      `;

	const chatCompletion = await client.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: prompt,
			},
		],
		response_format: { type: 'json_object' },
	});

	const responseText = chatCompletion.choices[0].message.content;
	console.log(responseText);

	return responseText;
};

export const generateResponseFromImage = async (image, client) => {
	if (!image || !image.startsWith('data:image/'))
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
	const chatCompletion = await client.chat.completions.create({
		model: 'gpt-4-turbo',
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: `Please extract name, phone (if present), and address and return JSON in format {
                "name": "",
                "phone": "",
                "address": {
                  "street1": "",
                  "street2": "",
                  "city": "",
                  "state": "",
                  "zip_code": ""
                }
              } and define state as 2 letters and zip_code if not present.`,
					},
					{
						type: 'image_url',
						image_url: {
							url: image,
						},
					},
				],
			},
		],
	});
	const responseText = chatCompletion.choices[0].message.content;
	// Remove markdown formatting if present
	const rawText = responseText.replace(/```json\s*|```/g, '').trim();

	const parsed = JSON.parse(rawText);

	console.log(parsed);

	return parsed;
};

export const bigIntToString = (obj) => {
	if (Array.isArray(obj)) {
		return obj.map(bigIntToString); // Рекурсивно применяем к массивам
	} else if (obj !== null && typeof obj === 'object') {
		return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, typeof value === 'bigint' ? value.toString() : bigIntToString(value)]));
	}
	return obj; // Возвращаем другие значения без изменений
};
