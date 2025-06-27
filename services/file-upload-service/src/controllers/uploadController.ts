import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

export const uploadImage = (req: Request, res: Response): void => {
    // Use multer to handle file upload
    upload.single('image')(req, res, async (err: any) => {
        try {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: err.message
                });
                return;
            }

            if (!req.file) {
                res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
                return;
            }

            // Convert buffer to base64
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'elearning-courses',
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 600, crop: 'limit' },
                    { quality: 'auto' }
                ]
            });

            res.status(200).json({
                success: true,
                message: 'Image uploaded successfully',
                data: {
                    url: result.secure_url,
                    public_id: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format
                }
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to upload image'
            });
        }
    });
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({
                success: false,
                message: 'Public ID is required'
            });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === 'ok') {
            return res.status(200).json({
                success: true,
                message: 'Image deleted successfully'
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to delete image'
            });
        }
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete image'
        });
    }
}; 