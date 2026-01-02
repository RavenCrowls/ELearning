import express, { Application } from "express";
import mongoose from "mongoose";
import { categoryRouter } from "./routes/categoryeRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../../.env" });

const app: Application = express();
app.use(cors());
const PORT: number = Number(process.env.CATEGORY_SERVICE_PORT) || 5004;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Category database connected"))
  .catch((err: Error) =>
    console.error("Category database connection error:", err)
  );

// Routes
app.use("/api/categories", categoryRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Category service is running on http://localhost:${PORT}`);
  });
}

export default app;
