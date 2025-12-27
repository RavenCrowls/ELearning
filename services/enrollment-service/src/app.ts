import express, { Application } from "express";
import mongoose from "mongoose";
import { enrollmentRouter } from "./routes/enrollmentRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../../.env" });

const app: Application = express();
const PORT: number = Number(process.env.ENROLLMENT_SERVICE_PORT) || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Enrollment database connected"))
  .catch((err: Error) =>
    console.error("Enrollment database connection error:", err)
  );

// Routes
app.use("/api/enrollments", enrollmentRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Enrollment service is running on http://localhost:${PORT}`);
  });
}

export default app;
