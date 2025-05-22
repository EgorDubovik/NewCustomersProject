import express from 'express';
import { generateResponseFromText, generateResponseFromImage } from '../utils/utils.js';
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

export default router;
