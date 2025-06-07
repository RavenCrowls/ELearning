import { Router } from 'express';
import CourseController from '../controllers/courseController';

const router = Router();
const courseController = new CourseController();

const {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    getPopularCourse,
    getNewestCourse
} = courseController;

router.post("/", createCourse.bind(courseController));
router.get("/", getAllCourses.bind(courseController));
router.get("/popular", getPopularCourse.bind(courseController));
router.get("/newest", getNewestCourse.bind(courseController));
router.get("/:courseId", getCourse.bind(courseController));
router.delete("/:courseId", deleteCourse.bind(courseController));
router.put("/:courseId", updateCourse.bind(courseController));

export { router as courseRouter };