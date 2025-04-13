import OpenAI from 'openai';
import express from 'express';
import { generateResponse, generateResponseFromImage } from './utils.js';

const app = express();
const client = new OpenAI();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.json({ limit: '10mb' }));

app.post('/', async (req, res) => {
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

	const response = await generateResponse(message, client);
	res.send(response);
});
app.get('/', (req, res) => {
	res.send('Hello World test');
});

app.post('/upload', async (req, res) => {
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

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
