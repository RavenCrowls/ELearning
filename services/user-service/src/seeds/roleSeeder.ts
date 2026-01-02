import Role from "../models/Role";

export const seedRoles = async () => {
  try {
    const existingRoles = await Role.countDocuments();
    if (existingRoles > 0) {
      console.log("Roles already seeded, skipping...");
      return;
    }

    const roles = [
      {
        ROLE_ID: "1",
        NAME: "Admin",
        STATUS: true,
      },
      {
        ROLE_ID: "2",
        NAME: "User",
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
