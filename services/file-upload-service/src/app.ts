import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { uploadRouter } from './routes/uploadRoutes';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: "../../.env" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app: Application = express();
const PORT: number = Number(process.env.FILE_UPLOAD_SERVICE_PORT) || 3011;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/upload', uploadRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'file-upload-service' });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`File upload service is running on http://localhost:${PORT}`);
    });
}

export default app; 