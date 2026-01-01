import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedRoles } from "./roleSeeder";
import { seedUsers } from "./userSeeder";

dotenv.config({ path: "../../../.env" });

const runSeeders = async () => {
  try {
    const mongoUri = String(process.env.MONGO_URI);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    console.log("\nStarting User Service Seeders...\n");

    await seedRoles();
    await seedUsers();

    console.log("\nAll User Service seeders completed successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  }
};

runSeeders();
