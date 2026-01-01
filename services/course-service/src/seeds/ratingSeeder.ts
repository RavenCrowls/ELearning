import Rating from "../models/Rating";
import { generateRatingId } from "../utils/idGenerator";

export const seedRatings = async () => {
  try {
    const existingRatings = await Rating.countDocuments();
    if (existingRatings > 0) {
      console.log("Ratings already seeded, skipping...");
      return;
    }

    const ratings = [
      {
        RATING_ID: generateRatingId(),
        COURSE_ID: "COURSE001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        RATING: 5,
        COMMENT:
          "Absolutely amazing course! Learned so much and the instructor explains everything clearly.",
        CREATED_AT: new Date("2024-06-10T10:00:00"),
        UPDATED_AT: new Date("2024-06-10T10:00:00"),
        STATUS: true,
      },
      {
        RATING_ID: generateRatingId(),
        COURSE_ID: "COURSE001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        RATING: 4,
        COMMENT:
          "Great content but could use more practical examples. Overall very satisfied.",
        CREATED_AT: new Date("2024-06-12T14:30:00"),
        UPDATED_AT: new Date("2024-06-12T14:30:00"),
        STATUS: true,
      },
      {
        RATING_ID: generateRatingId(),
        COURSE_ID: "COURSE002",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        RATING: 5,
        COMMENT:
          "Best iOS development course I have taken. Very comprehensive and up-to-date.",
        CREATED_AT: new Date("2024-06-15T09:20:00"),
        UPDATED_AT: new Date("2024-06-15T09:20:00"),
        STATUS: true,
      },
      {
        RATING_ID: generateRatingId(),
        COURSE_ID: "COURSE003",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        RATING: 5,
        COMMENT:
          "Excellent data science course! The projects are very practical and industry-relevant.",
        CREATED_AT: new Date("2024-06-18T16:45:00"),
        UPDATED_AT: new Date("2024-06-18T16:45:00"),
        STATUS: true,
      },
      {
        RATING_ID: generateRatingId(),
        COURSE_ID: "COURSE004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        RATING: 4,
        COMMENT:
          "Really good design course. Love the focus on user-centered design principles.",
        CREATED_AT: new Date("2024-06-20T11:15:00"),
        UPDATED_AT: new Date("2024-06-20T11:15:00"),
        STATUS: true,
      },
    ];

    await Rating.insertMany(ratings);
    console.log("Ratings seeded successfully");
  } catch (error) {
    console.error("Error seeding ratings:", error);
    throw error;
  }
};
