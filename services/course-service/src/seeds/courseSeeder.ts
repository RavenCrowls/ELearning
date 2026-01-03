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
        COURSE_ID: "COURSE001",
        TITLE: "Complete Web Development Bootcamp",
        INSTRUCTOR_ID: "USER002",
        CREATED_DATE: new Date("2024-01-15"),
        CATEGORIES: ["CAT001"],
        SUB_CATEGORIES: ["SUBCAT001", "SUBCAT002", "SUBCAT003"],
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
          "https://img.freepik.com/premium-photo/friends-people-group-teamwork-diversity_53876-58685.jpg?ga=GA1.1.64842012.1748338142&semt=ais_items_boosted&w=740",
        AVERAGE_RATING: 4.8,
        TOTAL_RATINGS: 245,
      },
      {
        COURSE_ID: "COURSE002",
        TITLE: "iOS Development with Swift",
        INSTRUCTOR_ID: "USER002",
        CREATED_DATE: new Date("2024-02-10"),
        CATEGORIES: ["CAT002"],
        SUB_CATEGORIES: ["SUBCAT004"],
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
          "https://res.cloudinary.com/djf63iwha/image/upload/v1751039713/elearning-courses/xr37lim9inunghf6dk86.jpg",
        AVERAGE_RATING: 4.6,
        TOTAL_RATINGS: 180,
      },
      {
        COURSE_ID: "COURSE003",
        TITLE: "Data Science with Python",
        INSTRUCTOR_ID: "USER003",
        CREATED_DATE: new Date("2024-03-05"),
        CATEGORIES: ["CAT003"],
        SUB_CATEGORIES: ["SUBCAT007", "SUBCAT008"],
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
        IMAGE_URL:
          "https://img.freepik.com/premium-photo/friends-people-group-teamwork-diversity_53876-58685.jpg?ga=GA1.1.64842012.1748338142&semt=ais_items_boosted&w=740",
        AVERAGE_RATING: 4.9,
        TOTAL_RATINGS: 320,
      },
      {
        COURSE_ID: "COURSE004",
        TITLE: "UI/UX Design Masterclass",
        INSTRUCTOR_ID: "USER003",
        CREATED_DATE: new Date("2024-04-20"),
        CATEGORIES: ["CAT004"],
        SUB_CATEGORIES: ["SUBCAT010", "SUBCAT012"],
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
        IMAGE_URL:
          "https://res.cloudinary.com/djf63iwha/image/upload/v1751160620/elearning-courses/y35rh0dgtfsnk9fbpgad.jpg",
        AVERAGE_RATING: 4.7,
        TOTAL_RATINGS: 195,
      },
      {
        COURSE_ID: "COURSE005",
        TITLE: "Digital Marketing Fundamentals",
        INSTRUCTOR_ID: "USER002",
        CREATED_DATE: new Date("2024-05-12"),
        CATEGORIES: ["CAT005"],
        SUB_CATEGORIES: ["SUBCAT013"],
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
          "https://res.cloudinary.com/djf63iwha/image/upload/v1751041659/elearning-courses/f55yld4x2urkjbzsrejd.jpg",
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
