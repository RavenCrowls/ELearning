import Video from "../models/Video";
import { generateVideoId } from "../utils/idGenerator";

export const seedVideos = async () => {
  try {
    const existingVideos = await Video.countDocuments();
    if (existingVideos > 0) {
      console.log("Videos already seeded, skipping...");
      return;
    }

    const videos = [
      // Lecture 1 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC001",
        TITLE: "Welcome to the Course",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "5:30",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC001",
        TITLE: "Course Overview",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "8:45",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC001",
        TITLE: "Setting Up Your Environment",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "12:20",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 2 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC002",
        TITLE: "HTML Basics",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "15:10",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC002",
        TITLE: "CSS Fundamentals",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "18:30",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC002",
        TITLE: "Building Your First Webpage",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "22:45",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 3 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC003",
        TITLE: "Introduction to Swift",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "10:15",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC003",
        TITLE: "Variables and Data Types",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "14:20",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC003",
        TITLE: "Control Flow",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "16:40",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 4 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC004",
        TITLE: "Python Setup",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "8:00",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC004",
        TITLE: "NumPy Basics",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "20:30",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC004",
        TITLE: "Pandas Introduction",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "25:15",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 5 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC005",
        TITLE: "Design Thinking Process",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "12:50",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC005",
        TITLE: "Color Theory",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "18:10",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC005",
        TITLE: "Typography Essentials",
        URL: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        DURATION: "15:30",
        ORDER: 3,
        STATUS: true,
      },
    ];

    await Video.insertMany(videos);
    console.log("Videos seeded successfully");
  } catch (error) {
    console.error("Error seeding videos:", error);
    throw error;
  }
};
