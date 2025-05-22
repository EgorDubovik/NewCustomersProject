import express from 'express';
import aiRoutes from './routes/aiRouters.js';
import corsMiddleware from './middleware/corsMiddleware.js';
import authMiddleware from './middleware/authMidlleware.js';

const app = express();

app.use(corsMiddleware);

app.use(express.json({ limit: '10mb' }));

app.use('/ai', authMiddleware, aiRoutes);

app.get('/healthcheck', (req, res) => {
	res.send({ status: 'success', message: 'Server is running' });
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
