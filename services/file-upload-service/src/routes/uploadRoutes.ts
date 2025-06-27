import { Router } from 'express';
import { uploadImage, deleteImage, uploadVideo } from '../controllers/uploadController';

const router = Router();

// Upload image to Cloudinary
router.post('/image', uploadImage);

// Upload video to Cloudinary
router.post('/video', uploadVideo);

// Delete image from Cloudinary
router.delete('/image', deleteImage);

export { router as uploadRouter }; 