import express, { Application } from 'express';
import mongoose from 'mongoose';
import { publishmentRouter } from './routes/publishmentRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: "../../.env" });

const app: Application = express();
app.use(cors());
const PORT: number = Number(process.env.PUBLISHMENT_SERVICE_PORT) || 3005;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose.connect(mongoUri)
    .then(() => console.log('Publishment database connected'))
    .catch((err: Error) => console.error('Publishment database connection error:', err));

// Routes
app.use('/api/publishments', publishmentRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Publishment service is running on http://localhost:${PORT}`);
    });
}

export default app;