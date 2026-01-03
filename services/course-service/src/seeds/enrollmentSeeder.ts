import Enrollment from "../models/Enrollment";
import { generateEnrollmentId } from "../utils/idGenerator";

export const seedEnrollments = async () => {
  try {
    const existingEnrollments = await Enrollment.countDocuments();
    if (existingEnrollments > 0) {
      console.log("Enrollments already seeded, skipping...");
      return;
    }

    const enrollments = [
      {
        ENROLLMENT_ID: "ENROLL001",
        COURSE_ID: "COURSE001",
        USER_ID: "USER004",
        PROGRESS: 45,
        STATUS: 1,
        WATCHED: ["VID001", "VID002"],
      },
      {
        ENROLLMENT_ID: "ENROLL002",
        COURSE_ID: "COURSE002",
        USER_ID: "USER004",
        PROGRESS: 20,
        STATUS: 1,
        WATCHED: ["VID004"],
      },
      {
        ENROLLMENT_ID: "ENROLL003",
        COURSE_ID: "COURSE003",
        USER_ID: "USER005",
        PROGRESS: 80,
        STATUS: 1,
        WATCHED: ["VID007", "VID008", "VID009"],
      },
      {
        ENROLLMENT_ID: "ENROLL004",
        COURSE_ID: "COURSE001",
        USER_ID: "USER005",
        PROGRESS: 100,
        STATUS: 1,
        WATCHED: ["VID001", "VID002", "VID003"],
      },
      {
        ENROLLMENT_ID: "ENROLL005",
        COURSE_ID: "COURSE004",
        USER_ID: "USER004",
        PROGRESS: 35,
        STATUS: 1,
        WATCHED: ["VID010", "VID011"],
      },
    ];

    await Enrollment.insertMany(enrollments);
    console.log("Enrollments seeded successfully");
  } catch (error) {
    console.error("Error seeding enrollments:", error);
    throw error;
  }
};
