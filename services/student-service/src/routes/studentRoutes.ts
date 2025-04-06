import { Router } from 'express';
import StudentController from '../controllers/studentController';

const router = Router();
const studentController = new StudentController();

// Bind the controller methods to maintain correct 'this' context
const {
    createStudent,
    getAllStudents,
    getStudent,
    deleteStudent,
    updateStudent
} = studentController;

router.post("/", createStudent.bind(studentController));
router.get("/", getAllStudents.bind(studentController));
router.get("/:studentId", getStudent.bind(studentController));
router.delete("/:studentId", deleteStudent.bind(studentController));
router.put("/:studentId", updateStudent.bind(studentController));

export { router as studentRouter };