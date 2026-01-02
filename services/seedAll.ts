import { execSync } from "child_process";
import path from "path";

const runCommand = (command: string, cwd: string) => {
  try {
    console.log(`\nRunning in ${path.basename(cwd)}...`);
    execSync(command, { cwd, stdio: "inherit" });
  } catch (error) {
    console.error(`Error in ${path.basename(cwd)}:`, error);
    throw error;
  }
};

const seedAll = async () => {
  console.log("\nStarting Database Seeding Process...\n");
  console.log("═".repeat(60));

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
