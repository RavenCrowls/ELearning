import { Router } from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController';

const router = Router();

// Upload image to Cloudinary
router.post('/image', uploadImage);

// Delete image from Cloudinary
router.delete('/image', deleteImage);

export { router as uploadRouter }; 