import express from 'express';
import { generateResponseFromText, generateResponseFromImage, getOpenAIResponse } from '../utils/utils.js';
import OpenAI from 'openai';

const router = express.Router();
const client = new OpenAI();
router.post('/parse-customer/text', async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ error: 'Missing message' });
	}
	const { message } = req.body;
	if (!message) {
		return res.status(400).json({ error: 'Missing message' });
	}
	if (message.length < 10) {
		return res.status(400).json({ error: 'Message must be at least 10 characters' });
	}

	const response = await generateResponseFromText(message, client);
	res.send(response);
});

router.post('/parse-customer/image', async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ error: 'Missing message' });
	}
	const { message } = req.body;
	if (!message || !message.startsWith('data:image/')) {
		return res.status(400).json({ error: 'Missing message' });
	}

	const response = await generateResponseFromImage(message, client);

	res.send(response);
});

router.post('/get-job-report', async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ error: 'Missing message' });
	}
	const { title, description } = req.body;
	if (!title || !description) {
		return res.status(400).json({ error: 'Missing title or description' });
	}
	if (title.length < 2 || description.length < 2) {
		return res.status(400).json({ error: 'Title and description must be at least 2 characters' });
	}

	const systemMessage = {
		role: 'system',
		content: [
			{
				type: 'input_text',
				text: 'You are a professional appliance repair technician in the USA. Your task is to generate a concise, professional repair report (max 30 words) based on a brief description of the repair. Respond ONLY with a JSON object in the following format: { "report": "<your report text here>" }.',
			},
		],
	};
	const messages = {
		role: 'user',
		content: [
			{
				type: 'input_text',
				text: `${title}: ${description}`,
			},
		],
	};

	const response = await getOpenAIResponse([systemMessage, messages], client);
	if (!response) {
		return res.status(500).json({ error: 'Failed to generate response' });
	}
	res.send(response);
});

export default router;
