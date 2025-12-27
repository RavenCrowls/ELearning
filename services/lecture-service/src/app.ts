import express, { Application } from "express";
import mongoose from "mongoose";
import { lectureRouter } from "./routes/lectureRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../../.env" });

const app: Application = express();
app.use(cors());
const PORT: number = Number(process.env.LECTURE_SERVICE_PORT) || 5006;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Lecture database connected"))
  .catch((err: Error) =>
    console.error("Lecture database connection error:", err)
  );

// Routes
app.use("/api/lectures", lectureRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Lecture service is running on http://localhost:${PORT}`);
  });
}

export default app;
