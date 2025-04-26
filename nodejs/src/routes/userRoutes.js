import express from 'express';
import crypto from 'crypto';
import prisma from '../lib/prisma.js';

const router = express.Router();

router.post('/login', async (req, res) => {
	const bearerToken = req.headers.authorization;

	if (!bearerToken || !bearerToken.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

	const token = bearerToken.split(' ')[1];
	const [id, rawToken] = token.split('|');

	const hashFromDB = 'a36b8c085a87c2d4c04abe052c8ae13f35af6334e16b6a98494a24d57f05296c';

	const hashToken = crypto.createHash('sha256').update(rawToken).digest('hex');

	const isMatch = hashToken === hashFromDB;

	if (!isMatch) return res.status(401).json({ error: 'Unauthorized' });

	return res.status(200).json({ id, rawToken });
});

export default router;
