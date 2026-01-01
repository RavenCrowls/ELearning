import Publishment from "../models/Publishment";

export const seedPublishments = async () => {
  try {
    const existingPublishments = await Publishment.countDocuments();
    if (existingPublishments > 0) {
      console.log("Publishments already seeded, skipping...");
      return;
    }

    const publishments = [
      {
        PUBLISHMENT_ID: "PUB001",
        COURSE_ID: "COURSE001",
        PUBLISHED_DATE: new Date("2024-02-01"),
        STATUS: true,
      },
      {
        PUBLISHMENT_ID: "PUB002",
        COURSE_ID: "COURSE002",
        PUBLISHED_DATE: new Date("2024-03-15"),
        STATUS: true,
      },
      {
        PUBLISHMENT_ID: "PUB003",
        COURSE_ID: "COURSE003",
        PUBLISHED_DATE: new Date("2024-04-01"),
        STATUS: true,
      },
      {
        PUBLISHMENT_ID: "PUB004",
        COURSE_ID: "COURSE004",
        PUBLISHED_DATE: new Date("2024-05-10"),
        STATUS: true,
      },
      {
        PUBLISHMENT_ID: "PUB005",
        COURSE_ID: "COURSE005",
        PUBLISHED_DATE: new Date("2024-06-01"),
        STATUS: true,
      },
    ];

    await Publishment.insertMany(publishments);
    console.log("Publishments seeded successfully");
  } catch (error) {
    console.error("Error seeding publishments:", error);
    throw error;
  }
};
