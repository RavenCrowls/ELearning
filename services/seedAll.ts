import { execSync } from "child_process";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from root .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

const runCommand = (command: string, cwd: string) => {
  try {
    console.log(`\nRunning in ${path.basename(cwd)}...`);
    execSync(command, { cwd, stdio: "inherit" });
  } catch (error) {
    console.error(`Error in ${path.basename(cwd)}:`, error);
    throw error;
  }
};

const clearDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    console.log("\nConnecting to MongoDB to clear existing data...");
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection failed");

    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections to drop`);

    for (const collection of collections) {
      await db.dropCollection(collection.name);
      console.log(`Dropped collection: ${collection.name}`);
    }

    await mongoose.disconnect();
    console.log("Database cleared successfully!\n");
  } catch (error) {
    console.error("Error clearing database:", error);
    throw error;
  }
};

const seedAll = async () => {
  console.log("\nStarting Database Seeding Process...\n");
  console.log("═".repeat(60));

  // Clear existing data first
  await clearDatabase();

  const servicesPath = __dirname;
  const services = [
    "user-service",
    "category-service",
    "course-service",
    "cart-service",
  ];

  try {
    for (const service of services) {
      const servicePath = path.join(servicesPath, service);
      runCommand("npm run seed", servicePath);
    }

    console.log("\n" + "═".repeat(60));
    console.log("\nAll database seeders completed successfully!\n");
    console.log("Seeded Data Summary:");
    console.log("User Service: 5 Roles, 5 Users");
    console.log("Category Service: 5 Categories (with 3 subcategories each)");
    console.log("Course Service: 5 Courses, 5 Lectures (with 3 videos each),");
    console.log("5 Enrollments, 5 Publishments,");
    console.log("11 Comments (5 parent + 6 replies),");
    console.log("5 Ratings");
    console.log("Cart Service: 5 Carts (with up to 3 items each)\n");
  } catch (error) {
    console.error("\nSeeding process failed:", error);
    process.exit(1);
  }
};

seedAll();
