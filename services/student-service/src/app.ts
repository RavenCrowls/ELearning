import express, { Application } from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './routes/studentRoutes';
import dotenv from 'dotenv';

dotenv.config({ path: "../../.env" });

const app: Application = express();
const PORT: number = Number(process.env.STUDENT_SERVICE_PORT) || 3002;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose.connect(mongoUri)
    .then(() => console.log('Student database connected'))
    .catch((err: Error) => console.error('Student database connection error:', err));

// Routes
app.use('/api/students', studentRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Student service is running on http://localhost:${PORT}`);
    });
}

export default app;