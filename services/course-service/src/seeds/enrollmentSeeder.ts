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
        ENROLLMENT_ID: generateEnrollmentId(),
        COURSE_ID: "COURSE001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        PROGRESS: 45,
        STATUS: 1,
        WATCHED: ["VID001", "VID002", "VID004"],
      },
      {
        ENROLLMENT_ID: generateEnrollmentId(),
        COURSE_ID: "COURSE002",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        PROGRESS: 20,
        STATUS: 1,
        WATCHED: ["VID007"],
      },
      {
        ENROLLMENT_ID: generateEnrollmentId(),
        COURSE_ID: "COURSE003",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        PROGRESS: 80,
        STATUS: 1,
        WATCHED: ["VID010", "VID011", "VID012"],
      },
      {
        ENROLLMENT_ID: generateEnrollmentId(),
        COURSE_ID: "COURSE001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        PROGRESS: 100,
        STATUS: 1,
        WATCHED: ["VID001", "VID002", "VID003", "VID004", "VID005", "VID006"],
      },
      {
        ENROLLMENT_ID: generateEnrollmentId(),
        COURSE_ID: "COURSE004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        PROGRESS: 35,
        STATUS: 1,
        WATCHED: ["VID013", "VID014"],
      },
    ];

    await Enrollment.insertMany(enrollments);
    console.log("Enrollments seeded successfully");
  } catch (error) {
    console.error("Error seeding enrollments:", error);
    throw error;
  }
};
