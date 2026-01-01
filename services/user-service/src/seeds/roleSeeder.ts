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
        ROLE_ID: "R001",
        NAME: "Admin",
        STATUS: true,
      },
      {
        ROLE_ID: "R002",
        NAME: "Instructor",
        STATUS: true,
      },
      {
        ROLE_ID: "R003",
        NAME: "Student",
        STATUS: true,
      },
      {
        ROLE_ID: "R004",
        NAME: "Moderator",
        STATUS: true,
      },
      {
        ROLE_ID: "R005",
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
