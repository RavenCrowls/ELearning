import { Router } from 'express';
import LectureController from '../controllers/lectureController';

const router = Router();
const lectureController = new LectureController();

const {
    createLecture,
    getAllLectures,
    getLecture,
    updateLecture,
    deleteLecture
} = lectureController;

router.post("/", createLecture.bind(lectureController));
router.get("/", getAllLectures.bind(lectureController));
router.get("/:lectureId", getLecture.bind(lectureController));
router.put("/:lectureId", updateLecture.bind(lectureController));
router.delete("/:lectureId", deleteLecture.bind(lectureController));

export { router as lectureRouter };