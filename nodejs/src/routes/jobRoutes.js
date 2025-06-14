import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import prisma from '../lib/prisma.js';
import { canUploadImage, canDeleteImage } from '../policies/jobPolicy.js';
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024 * 10, // 10MB limit
	},
});
const s3 = new S3Client({
	region: process.env.AWS_DEFAULT_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const router = express.Router();

router.post('/upload-image/:job_id', upload.single('image'), async (req, res) => {
	const job = await prisma.job.findUnique({ where: { id: parseInt(req.params.job_id || 0) } });
	if (!job) return res.status(404).json({ error: 'Job not found' });

	if (!canUploadImage(req.user, job)) return res.status(403).json({ error: 'Forbidden' });

	try {
		const file = req.file;
		const jobId = req.params.job_id;

		if (!file || !jobId) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		const filePath = `images/debug/job_${jobId}${Date.now()}-${file.originalname}`;
		const fileBuffer = file.buffer;

		const scaledImage = await sharp(fileBuffer)
			.resize({ width: parseInt(process.env.UPLOAD_WIDTH_SIZE || 1000, 10) })
			.jpeg({ quality: 80 })
			.toBuffer();

		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET,
			Key: filePath,
			Body: scaledImage,
			ContentType: 'image/jpeg',
			ACL: 'public-read',
		});

		await s3.send(command);

		const url = process.env.AWS_FILE_ACCESS_URL + filePath;

		const jobImage = await prisma.jobImage.create({
			data: {
				job_id: parseInt(jobId),
				path: url,
				owner_id: parseInt(req.user.id),
			},
		});

		return res.json({ message: 'Image uploaded successfully', image: jobImage });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Failed to upload image' });
	}
});

router.delete('/delete-image/:image_id', async (req, res) => {
	const image = await prisma.jobImage.findUnique({ where: { id: parseInt(req.params.image_id || 0) } });
	if (!image) return res.status(404).json({ error: 'Image not found' });

	if (!canDeleteImage(req.user, image)) return res.status(403).json({ error: 'Forbidden' });

	try {
		const filePath = image.path.replace(process.env.AWS_FILE_ACCESS_URL, '');
		const deleted = await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET, Key: filePath }));
		if (!deleted) return res.status(500).json({ error: 'Failed to delete image' });

		await prisma.jobImage.delete({ where: { id: parseInt(req.params.image_id || 0) } });
		return res.json({ message: 'Image deleted successfully' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Failed to delete image' });
	}
});

export default router;
