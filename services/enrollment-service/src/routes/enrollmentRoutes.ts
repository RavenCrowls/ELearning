import { Router } from 'express';
import EnrollmentController from '../controllers/enrollmentController';

const router = Router();
const enrollmentController = new EnrollmentController();

// Bind the controller methods to maintain correct 'this' context
const {
    createEnrollment,
    getAllEnrollments,
    getEnrollment,
    deleteEnrollment,
    updateEnrollment
} = enrollmentController;

router.post("/", createEnrollment.bind(enrollmentController));
router.get("/", getAllEnrollments.bind(enrollmentController));
router.get("/:enrollmentId", getEnrollment.bind(enrollmentController));
router.delete("/:enrollmentId", deleteEnrollment.bind(enrollmentController));
router.put("/:enrollmentId", updateEnrollment.bind(enrollmentController));

export { router as enrollmentRouter };