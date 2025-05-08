import express, { Application } from 'express';
import mongoose from 'mongoose';
import { cartRouter } from './routes/cartRoutes';
import dotenv from 'dotenv';

dotenv.config({ path: "../../.env" });

const app: Application = express();
const PORT: number = Number(process.env.CART_SERVICE_PORT) || 3009;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose.connect(mongoUri)
    .then(() => console.log('Cart database connected'))
    .catch((err: Error) => console.error('Cart database connection error:', err));

// Routes
app.use('/api/carts', cartRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Cart service is running on http://localhost:${PORT}`);
    });
}

export default app; 