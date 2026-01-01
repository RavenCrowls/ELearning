import Course from "../models/Course";
import { generateCourseId } from "../utils/idGenerator";

export const seedCourses = async () => {
  try {
    const existingCourses = await Course.countDocuments();
    if (existingCourses > 0) {
      console.log("Courses already seeded, skipping...");
      return;
    }

    const courses = [
      {
        COURSE_ID: generateCourseId(),
        TITLE: "Complete Web Development Bootcamp",
        INSTRUCTOR_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcF",
        CREATED_DATE: new Date("2024-01-15"),
        CATEGORIES: ["CAT001"],
        SUB_CATEGORIES: [
          "Frontend Development",
          "Backend Development",
          "Full Stack Development",
        ],
        RATING: ["4.8", "245"],
        DESCRIPTION:
          "Learn web development from scratch. HTML, CSS, JavaScript, React, Node.js, and more!",
        OUTPUT: [
          "Build responsive websites",
          "Master JavaScript",
          "Create full-stack applications",
        ],
        PRICE: 99.99,
        LEVEL: "Beginner",
        DURATION: "40 hours",
        NUMBER_OF_VIDEOS: 15,
        ENROLLMENT_COUNT: 1250,
        APPROVAL_STATUS: "Approved",
        STATUS: true,
        IMAGE_URL:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        AVERAGE_RATING: 4.8,
        TOTAL_RATINGS: 245,
      },
      {
        COURSE_ID: generateCourseId(),
        TITLE: "iOS Development with Swift",
        INSTRUCTOR_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcF",
        CREATED_DATE: new Date("2024-02-10"),
        CATEGORIES: ["CAT002"],
        SUB_CATEGORIES: ["iOS Development"],
        RATING: ["4.6", "180"],
        DESCRIPTION:
          "Master iOS app development using Swift and SwiftUI. Build real-world applications.",
        OUTPUT: ["Build iOS apps", "Understand SwiftUI", "Deploy to App Store"],
        PRICE: 149.99,
        LEVEL: "Intermediate",
        DURATION: "35 hours",
        NUMBER_OF_VIDEOS: 12,
        ENROLLMENT_COUNT: 820,
        APPROVAL_STATUS: "Approved",
        STATUS: true,
        IMAGE_URL:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
        AVERAGE_RATING: 4.6,
        TOTAL_RATINGS: 180,
      },
      {
        COURSE_ID: generateCourseId(),
        TITLE: "Data Science with Python",
        INSTRUCTOR_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcG",
        CREATED_DATE: new Date("2024-03-05"),
        CATEGORIES: ["CAT003"],
        SUB_CATEGORIES: ["Machine Learning", "Data Analysis"],
        RATING: ["4.9", "320"],
        DESCRIPTION:
          "Complete data science course covering Python, pandas, numpy, scikit-learn, and machine learning.",
        OUTPUT: [
          "Master Python for data science",
          "Build ML models",
          "Analyze complex datasets",
        ],
        PRICE: 129.99,
        LEVEL: "Advanced",
        DURATION: "50 hours",
        NUMBER_OF_VIDEOS: 18,
        ENROLLMENT_COUNT: 1580,
        APPROVAL_STATUS: "Approved",
        STATUS: true,
        IMAGE_URL: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        AVERAGE_RATING: 4.9,
        TOTAL_RATINGS: 320,
      },
      {
        COURSE_ID: generateCourseId(),
        TITLE: "UI/UX Design Masterclass",
        INSTRUCTOR_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcG",
        CREATED_DATE: new Date("2024-04-20"),
        CATEGORIES: ["CAT004"],
        SUB_CATEGORIES: ["UI/UX Design", "Web Design"],
        RATING: ["4.7", "195"],
        DESCRIPTION:
          "Learn modern UI/UX design principles, Figma, user research, and prototyping.",
        OUTPUT: [
          "Design beautiful interfaces",
          "Conduct user research",
          "Create interactive prototypes",
        ],
        PRICE: 89.99,
        LEVEL: "Beginner",
        DURATION: "28 hours",
        NUMBER_OF_VIDEOS: 10,
        ENROLLMENT_COUNT: 950,
        APPROVAL_STATUS: "Approved",
        STATUS: true,
        IMAGE_URL: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        AVERAGE_RATING: 4.7,
        TOTAL_RATINGS: 195,
      },
      {
        COURSE_ID: generateCourseId(),
        TITLE: "Digital Marketing Fundamentals",
        INSTRUCTOR_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcF",
        CREATED_DATE: new Date("2024-05-12"),
        CATEGORIES: ["CAT005"],
        SUB_CATEGORIES: ["Marketing"],
        RATING: ["4.5", "150"],
        DESCRIPTION:
          "Master digital marketing strategies including SEO, social media, email marketing, and analytics.",
        OUTPUT: [
          "Create marketing campaigns",
          "Optimize for SEO",
          "Analyze marketing metrics",
        ],
        PRICE: 79.99,
        LEVEL: "Beginner",
        DURATION: "25 hours",
        NUMBER_OF_VIDEOS: 8,
        ENROLLMENT_COUNT: 680,
        APPROVAL_STATUS: "Approved",
        STATUS: true,
        IMAGE_URL:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        AVERAGE_RATING: 4.5,
        TOTAL_RATINGS: 150,
      },
    ];

    await Course.insertMany(courses);
    console.log("Courses seeded successfully");
  } catch (error) {
    console.error("Error seeding courses:", error);
    throw error;
  }
};
