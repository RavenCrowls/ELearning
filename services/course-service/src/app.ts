import express, { Application } from "express";
import mongoose from "mongoose";
import { courseRouter } from "./routes/courseRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../../.env" });

const app: Application = express();
app.use(cors());
const PORT: number = Number(process.env.COURSE_SERVICE_PORT) || 5003;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Course database connected"))
  .catch((err: Error) =>
    console.error("Course database connection error:", err)
  );

// Routes
app.use("/api/courses", courseRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Course service is running on http://localhost:${PORT}`);
  });
}

export default app;
