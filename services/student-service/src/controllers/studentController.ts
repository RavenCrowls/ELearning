import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student';

class StudentController {
    async createStudent(req: Request, res: Response) {
        try {
            const { STUDENT_ID, NAME, EMAIL, AVATAR, BIO, JOIN_DATE, STATUS, ENROLLMENTS } = req.body;
            const newStudent = new Student({
                STUDENT_ID,
                NAME,
                EMAIL,
                AVATAR,
                BIO,
                JOIN_DATE,
                STATUS,
                ENROLLMENTS
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
            const { NAME, EMAIL, AVATAR, BIO, JOIN_DATE, ENROLLMENTS } = req.body;
            const data = {
                NAME,
                EMAIL,
                AVATAR,
                BIO,
                JOIN_DATE,
                ENROLLMENTS
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
            const student = await Student.findOne({ STUDENT_ID: studentId, STATUS: 1 });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            student.STATUS = false;
            await student.save();
            res.status(200).json({ message: "Student status updated to 0", student });
        } catch (error) {
            res.status(500).json({ message: "Error updating student status", error });
        }
    }
}

export default StudentController;