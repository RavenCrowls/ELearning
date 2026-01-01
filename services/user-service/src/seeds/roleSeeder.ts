import Role from "../models/Role";
import { generateRoleId } from "../utils/idGenerator";

export const seedRoles = async () => {
  try {
    const existingRoles = await Role.countDocuments();
    if (existingRoles > 0) {
      console.log("Roles already seeded, skipping...");
      return;
    }

    const roles = [
      {
        ROLE_ID: generateRoleId(),
        NAME: "Admin",
        STATUS: true,
      },
      {
        ROLE_ID: generateRoleId(),
        NAME: "Instructor",
        STATUS: true,
      },
      {
        ROLE_ID: generateRoleId(),
        NAME: "Student",
        STATUS: true,
      },
      {
        ROLE_ID: generateRoleId(),
        NAME: "Moderator",
        STATUS: true,
      },
      {
        ROLE_ID: generateRoleId(),
        NAME: "Guest",
        STATUS: true,
      },
    ];

    await Role.insertMany(roles);
    console.log("Roles seeded successfully");
  } catch (error) {
    console.error("Error seeding roles:", error);
    throw error;
  }
};
