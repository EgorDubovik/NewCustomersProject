import prisma from '../lib/prisma.js';
import crypto from 'crypto';

export default async function authMiddleware(req, res, next) {
	const bearerToken = req.headers.authorization;

	if (!bearerToken || !bearerToken.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

	const token = bearerToken.split(' ')[1];
	const [id, rawToken] = token.split('|');

	try {
		const userToken = await prisma.PersonalAccessToken.findUnique({ where: { id: Number(id) } });

		const hashToken = crypto.createHash('sha256').update(rawToken).digest('hex');
		const isMatch = hashToken === userToken?.token;

		if (!isMatch) return res.status(401).json({ error: 'Unauthorized' });

		const user = await prisma.User.findUnique({ where: { id: userToken.tokenable_id.toString() } });
		req.user = user;
		return next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: 'Unauthorized' });
	}
}
