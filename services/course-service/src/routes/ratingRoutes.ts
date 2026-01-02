import { Router } from "express";
import RatingController from "../controllers/ratingController";

const router = Router();
const ratingController = new RatingController();

const {
  createRating,
  getRatingsByCourse,
  getRating,
  getUserRatingForCourse,
  updateRating,
  deleteRating,
} = ratingController;

// Rating routes
router.post("/", createRating.bind(ratingController));
router.get("/course/:courseId", getRatingsByCourse.bind(ratingController));
router.get("/:ratingId", getRating.bind(ratingController));
router.get(
  "/course/:courseId/user/:userId",
  getUserRatingForCourse.bind(ratingController)
);
router.put("/:ratingId", updateRating.bind(ratingController));
router.delete("/:ratingId", deleteRating.bind(ratingController));

export { router as ratingRouter };
