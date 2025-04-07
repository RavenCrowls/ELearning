import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student';

class StudentController {
    async createStudent(req: Request, res: Response) {
        try {
            const { STUDENT_ID, NAME, EMAIL, AVATAR, BIO, JOIN_DATE, STATUS } = req.body;
            const newStudent = new Student({
                STUDENT_ID,
                NAME,
                EMAIL,
                AVATAR,
                BIO,
                JOIN_DATE,
                STATUS
            });
            await newStudent.save();
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({ message: "Error creating student", error });
        }
    }

    async getAllStudents(req: Request, res: Response) {
        try {
            const studentList = await Student.find({ STATUS: 1 });
            res.status(200).json(studentList);
        } catch (error) {
            res.status(500).json({ message: "Error getting students", error });
        }
    }

    async getStudent(req: Request, res: Response) {
        try {
            const { studentId } = req.params;
            const student = await Student.findOne({ STUDENT_ID: studentId, STATUS: 1 });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({ message: "Error getting student", error });
        }
    }

    async updateStudent(req: Request, res: Response) {
        try {
            const { studentId } = req.params;
            const { NAME, EMAIL, AVATAR, BIO } = req.body;
            const data = {
                NAME,
                EMAIL,
                AVATAR,
                BIO,
            };
            const updatedStudent = await Student.findOneAndUpdate(
                { STUDENT_ID: studentId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json(updatedStudent);
        } catch (error) {
            res.status(500).json({ message: "Error updating student", error });
        }
    }

    async deleteStudent(req: Request, res: Response) {
        try {
            const { studentId } = req.params;
            const deletedStudent = await Student.findOne({ STUDENT_ID: studentId, STATUS: 1 });
            if (!deletedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            deletedStudent.STATUS = false;
            await deletedStudent.save();
            res.status(200).json(deletedStudent);
        } catch (error) {
            res.status(500).json({ message: "Error deleting student", error });
        }
    }
}

export default StudentController;