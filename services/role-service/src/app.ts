import express, { Application } from "express";
import mongoose from "mongoose";
import { roleRouter } from "./routes/roleRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../../.env" });

const app: Application = express();
app.use(cors());
const PORT: number = Number(process.env.ROLE_SERVICE_PORT) || 5001;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUri: string = String(process.env.MONGO_URI);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Role database connected"))
  .catch((err: Error) => console.error("Role database connection error:", err));

// Routes
app.use("/api/roles", roleRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Role service is running on http://localhost:${PORT}`);
  });
}

export default app;
