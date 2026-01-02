import express, { Application } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoutes";
import { roleRouter } from "./routes/roleRoutes";
import dotenv from "dotenv";
import cors from "cors";
import { requireAuth } from "./middleware/clerkMiddleware";
import clerkWebhookRouter from "./routes/clerkWebhook";

dotenv.config({ path: "../../.env" });

const app: Application = express();
app.use(cors());
const PORT: number = Number(process.env.USER_SERVICE_PORT) || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose
  .connect(mongoUri)
  .then(() => console.log("User database connected"))
  .catch((err: Error) => console.error("User database connection error:", err));

// Protect all user routes with Clerk authentication
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api", clerkWebhookRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`User service is running on http://localhost:${PORT}`);
  });
}

export default app;
