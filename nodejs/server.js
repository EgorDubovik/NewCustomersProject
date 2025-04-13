import OpenAI from 'openai';
import express from 'express';

const app = express();
const client = new OpenAI();

async function generateResponse(message) {
	const prompt = `
      "${message}"
      Please extract name, phone (if present), and address and return JSON in format 
      {
         "name": "",
         "phone": "",
         "address": {
            "street1": "",
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
}

app.post('/', async (req, res) => {
	const response = await generateResponse('Hi!  Yes, my name is Brandii and my address is 5211 Spanish oaks Frisco, TX 75034');
	res.send(response);
	// res.send('Hello World test');
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
