import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedCourses } from "./courseSeeder";
import { seedLectures } from "./lectureSeeder";
import { seedVideos } from "./videoSeeder";
import { seedEnrollments } from "./enrollmentSeeder";
import { seedPublishments } from "./publishmentSeeder";
import { seedComments } from "./commentSeeder";
import { seedRatings } from "./ratingSeeder";

dotenv.config({ path: "../../../.env" });

const runSeeders = async () => {
  try {
    const mongoUri = String(process.env.MONGO_URI);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    console.log("\nStarting Course Service Seeders...\n");

    await seedCourses();
    await seedLectures();
    await seedVideos();
    await seedEnrollments();
    await seedPublishments();
    await seedComments();
    await seedRatings();

    console.log("\nAll Course Service seeders completed successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  }
};

runSeeders();
