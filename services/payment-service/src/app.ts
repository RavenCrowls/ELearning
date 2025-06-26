import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { paymentRouter } from './routes/paymentRoutes';

dotenv.config({ path: "../../.env" });

const app: Application = express();
const PORT: number = Number(process.env.PAYMENT_SERVICE_PORT) || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose.connect(mongoUri)
    .then(() => console.log('Payment database connected'))
    .catch((err: Error) => console.error('Payment database connection error:', err));

// Routes
app.use('/api/payment', paymentRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Payment service is running on http://localhost:${PORT}`);
    });
}

export default app;