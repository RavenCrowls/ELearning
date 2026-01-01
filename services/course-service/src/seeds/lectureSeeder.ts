import Lecture from "../models/Lecture";

export const seedLectures = async () => {
  try {
    const existingLectures = await Lecture.countDocuments();
    if (existingLectures > 0) {
      console.log("Lectures already seeded, skipping...");
      return;
    }

    const lectures = [
      {
        LECTURE_ID: "LEC001",
        COURSE_ID: "COURSE001",
        TITLE: "Introduction to Web Development",
        ORDER: 1,
        STATUS: true,
      },
      {
        LECTURE_ID: "LEC002",
        COURSE_ID: "COURSE001",
        TITLE: "HTML & CSS Fundamentals",
        ORDER: 2,
        STATUS: true,
      },
      {
        LECTURE_ID: "LEC003",
        COURSE_ID: "COURSE002",
        TITLE: "Swift Basics",
        ORDER: 1,
        STATUS: true,
      },
      {
        LECTURE_ID: "LEC004",
        COURSE_ID: "COURSE003",
        TITLE: "Python for Data Science",
        ORDER: 1,
        STATUS: true,
      },
      {
        LECTURE_ID: "LEC005",
        COURSE_ID: "COURSE004",
        TITLE: "Design Principles",
        ORDER: 1,
        STATUS: true,
      },
    ];

    await Lecture.insertMany(lectures);
    console.log("Lectures seeded successfully");
  } catch (error) {
    console.error("Error seeding lectures:", error);
    throw error;
  }
};
