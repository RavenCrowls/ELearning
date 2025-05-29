import express, { Application } from 'express';
import mongoose from 'mongoose';
import { videoRouter } from './routes/videoRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: "../../.env" });

const app: Application = express();
const PORT: number = Number(process.env.VIDEO_SERVICE_PORT) || 3008;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose.connect(mongoUri)
    .then(() => console.log('Video database connected'))
    .catch((err: Error) => console.error('Video database connection error:', err));

// Routes
app.use('/api/videos', videoRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Video service is running on http://localhost:${PORT}`);
    });
}

export default app;