import Comment from "../models/Comment";

export const seedComments = async () => {
  try {
    const existingComments = await Comment.countDocuments();
    if (existingComments > 0) {
      console.log("Comments already seeded, skipping...");
      return;
    }

    const comments = [
      // Parent comments
      {
        COMMENT_ID: "CMT001",
        VIDEO_ID: "VID001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        CONTENT: "Great introduction! Very clear explanation.",
        PARENT_COMMENT_ID: null,
        CREATED_AT: new Date("2024-06-15T10:30:00"),
        UPDATED_AT: new Date("2024-06-15T10:30:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT002",
        VIDEO_ID: "VID001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        CONTENT: "This is exactly what I was looking for!",
        PARENT_COMMENT_ID: null,
        CREATED_AT: new Date("2024-06-16T14:20:00"),
        UPDATED_AT: new Date("2024-06-16T14:20:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT003",
        VIDEO_ID: "VID004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        CONTENT: "HTML is easier than I thought!",
        PARENT_COMMENT_ID: null,
        CREATED_AT: new Date("2024-06-17T09:15:00"),
        UPDATED_AT: new Date("2024-06-17T09:15:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT004",
        VIDEO_ID: "VID007",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        CONTENT: "Swift syntax is clean and modern.",
        PARENT_COMMENT_ID: null,
        CREATED_AT: new Date("2024-06-18T11:45:00"),
        UPDATED_AT: new Date("2024-06-18T11:45:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT005",
        VIDEO_ID: "VID010",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        CONTENT: "Python setup was straightforward.",
        PARENT_COMMENT_ID: null,
        CREATED_AT: new Date("2024-06-19T16:00:00"),
        UPDATED_AT: new Date("2024-06-19T16:00:00"),
        STATUS: true,
      },

      // Replies to first comment
      {
        COMMENT_ID: "CMT006",
        VIDEO_ID: "VID001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcF",
        CONTENT: "Thanks! Glad you found it helpful.",
        PARENT_COMMENT_ID: "CMT001",
        CREATED_AT: new Date("2024-06-15T11:00:00"),
        UPDATED_AT: new Date("2024-06-15T11:00:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT007",
        VIDEO_ID: "VID001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        CONTENT: "I agree! Very well structured.",
        PARENT_COMMENT_ID: "CMT001",
        CREATED_AT: new Date("2024-06-15T12:30:00"),
        UPDATED_AT: new Date("2024-06-15T12:30:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT008",
        VIDEO_ID: "VID001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        CONTENT: "Looking forward to the next video!",
        PARENT_COMMENT_ID: "CMT001",
        CREATED_AT: new Date("2024-06-15T13:45:00"),
        UPDATED_AT: new Date("2024-06-15T13:45:00"),
        STATUS: true,
      },

      // Replies to third comment
      {
        COMMENT_ID: "CMT009",
        VIDEO_ID: "VID004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcF",
        CONTENT: "Great to hear! Keep practicing.",
        PARENT_COMMENT_ID: "CMT003",
        CREATED_AT: new Date("2024-06-17T10:00:00"),
        UPDATED_AT: new Date("2024-06-17T10:00:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT010",
        VIDEO_ID: "VID004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        CONTENT: "Wait until you get to CSS animations!",
        PARENT_COMMENT_ID: "CMT003",
        CREATED_AT: new Date("2024-06-17T11:20:00"),
        UPDATED_AT: new Date("2024-06-17T11:20:00"),
        STATUS: true,
      },
      {
        COMMENT_ID: "CMT011",
        VIDEO_ID: "VID004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        CONTENT: "Thanks for the encouragement!",
        PARENT_COMMENT_ID: "CMT003",
        CREATED_AT: new Date("2024-06-17T12:00:00"),
        UPDATED_AT: new Date("2024-06-17T12:00:00"),
        STATUS: true,
      },
    ];

    await Comment.insertMany(comments);
    console.log("Comments seeded successfully");
  } catch (error) {
    console.error("Error seeding comments:", error);
    throw error;
  }
};
