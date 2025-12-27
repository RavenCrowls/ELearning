import { Router } from "express";
import VideoController from "../controllers/videoController";

const router = Router();
const videoController = new VideoController();

const {
  createVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
  updateVideo,
  getVideosByLectureID,
} = videoController;

router.post("/", createVideo.bind(videoController));
router.get("/", getAllVideos.bind(videoController));
router.get(
  "/by-lecture/:lectureId",
  getVideosByLectureID.bind(videoController)
);
router.get("/:videoId", getVideo.bind(videoController));
router.delete("/:videoId", deleteVideo.bind(videoController));
router.put("/:videoId", updateVideo.bind(videoController));

export { router as videoRouter };
