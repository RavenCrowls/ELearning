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
        TITLE: "Hollow Knight",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749289754/Hollow_Knight_2023-01-27_12-15-43_wxzihj.mp4",
        DURATION: "5:30",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC001",
        TITLE: "Legends of Runeterra",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749289313/Legends_of_Runeterra_2024-11-25_17-47-17_mtfszf.mp4",
        DURATION: "8:45",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC001",
        TITLE: "Red Dead Redemption 2",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749288054/Red_Dead_Redemption_2_2024-01-14_19-24-10_e6mclk.mp4",
        DURATION: "12:20",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 2 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC002",
        TITLE: "Holo Cure",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749287169/HoloCure_2023-08-26_16-14-49_ciuhk1.mp4",
        DURATION: "15:10",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC002",
        TITLE: "War Thunder",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749287108/War_Thunder_-_In_battle_2021-12-13_15-21-28_cuzdrr.mp4",
        DURATION: "18:30",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC002",
        TITLE: "Battlefield 1",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749286596/na4uomtlmtvjajwtildo.mp4",
        DURATION: "22:45",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 3 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC003",
        TITLE: "Pokemon",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749386272/dbs4hqkhsuskpi3nfaxb.mp4",
        DURATION: "3:30",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC003",
        TITLE: "Minecraft",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749386347/vefqho4kjhzwvae09rxc.mp4",
        DURATION: "3:30",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC003",
        TITLE: "Left 4 Dead 2",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749386436/buscrddkwnsfjaf1jbrn.mp4",
        DURATION: "3:30",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 4 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC004",
        TITLE: "Elden Ring",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749386544/krmh89iufsxuwpdi6scd.mp4",
        DURATION: "3:30",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC004",
        TITLE: "Yhwach",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1751046739/elearning-videos/dsavzsq3ly63gpoh5yk9.mp4",
        DURATION: "0:47",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC004",
        TITLE: "Aizen",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1751046739/elearning-videos/njxayyupzk3p5fysm4r1.mp4",
        DURATION: "1:17",
        ORDER: 3,
        STATUS: true,
      },

      // Lecture 5 videos
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC005",
        TITLE: "Hollow Knight",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749289754/Hollow_Knight_2023-01-27_12-15-43_wxzihj.mp4",
        DURATION: "5:30",
        ORDER: 1,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC005",
        TITLE: "War Thunder",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749287108/War_Thunder_-_In_battle_2021-12-13_15-21-28_cuzdrr.mp4",
        DURATION: "18:10",
        ORDER: 2,
        STATUS: true,
      },
      {
        VIDEO_ID: generateVideoId(),
        LECTURE_ID: "LEC005",
        TITLE: "Pokemon",
        URL: "https://res.cloudinary.com/djf63iwha/video/upload/v1749386272/dbs4hqkhsuskpi3nfaxb.mp4",
        DURATION: "3:30",
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
