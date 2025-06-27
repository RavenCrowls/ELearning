import { Router } from 'express';
import CourseController from '../controllers/courseController';
import { filterCourses } from '../controllers/courseFilterController';

const router = Router();
const courseController = new CourseController();

const {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    getPopularCourse,
    getNewestCourse,
    searchCourseByName
} = courseController;

router.post("/", createCourse.bind(courseController));
router.get("/filter", filterCourses);
router.get("/search", searchCourseByName.bind(courseController));
router.get("/", getAllCourses.bind(courseController));
router.get("/popular", getPopularCourse.bind(courseController));
router.get("/newest", getNewestCourse.bind(courseController));
router.get("/:courseId", getCourse.bind(courseController));
router.delete("/:courseId", deleteCourse.bind(courseController));
router.put("/:courseId", updateCourse.bind(courseController));

export { router as courseRouter };