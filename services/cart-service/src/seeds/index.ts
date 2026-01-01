import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedCarts } from "./cartSeeder";

dotenv.config({ path: "../../../.env" });

const runSeeders = async () => {
  try {
    const mongoUri = String(process.env.MONGO_URI);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    console.log("\nStarting Cart Service Seeders...\n");

    await seedCarts();

    console.log("\nAll Cart Service seeders completed successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  }
};

runSeeders();
