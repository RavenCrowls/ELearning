import { Request, Response } from 'express';
import Enrollment, { IEnrollment } from '../models/Enrollment';

class EnrollmentController {
    async createEnrollment(req: Request, res: Response) {
        try {
            const {
                ENROLLMENT_ID,
                COURSE_ID,
                USER_ID,
                PROGRESS,
                STATUS,
                WATCHED
            } = req.body;
            const newEnrollment = new Enrollment({
                ENROLLMENT_ID,
                COURSE_ID,
                USER_ID,
                PROGRESS,
                STATUS,
                WATCHED
            });
            await newEnrollment.save();
            res.status(201).json(newEnrollment);
        } catch (error) {
            res.status(500).json({ message: "Error creating enrollment", error });
        }
    }

    async getAllEnrollments(req: Request, res: Response) {
        try {
            const enrollmentList = await Enrollment.find({ STATUS: 1 });
            res.status(200).json(enrollmentList);
        } catch (error) {
            res.status(500).json({ message: "Error getting enrollments", error });
        }
    }

    async getEnrollment(req: Request, res: Response) {
        try {
            const { enrollmentId } = req.params;
            const enrollment = await Enrollment.findOne({ ENROLLMENT_ID: enrollmentId, STATUS: 1 });
            if (!enrollment) {
                return res.status(404).json({ message: "Enrollment not found" });
            }
            res.status(200).json(enrollment);
        } catch (error) {
            res.status(500).json({ message: "Error getting enrollment", error });
        }
    }

    async updateEnrollment(req: Request, res: Response) {
        try {
            const { enrollmentId } = req.params;
            const {
                COURSE_ID,
                USER_ID,
                PROGRESS,
                WATCHED
            } = req.body;
            const data = {
                COURSE_ID,
                USER_ID,
                PROGRESS,
                WATCHED
            };
            const updatedEnrollment = await Enrollment.findOneAndUpdate(
                { ENROLLMENT_ID: enrollmentId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedEnrollment) {
                return res.status(404).json({ message: "Enrollment not found" });
            }
            res.status(200).json(updatedEnrollment);
        } catch (error) {
            res.status(500).json({ message: "Error updating enrollment", error });
        }
    }

    async deleteEnrollment(req: Request, res: Response) {
        try {
            const { enrollmentId } = req.params;
            const deletedEnrollment = await Enrollment.findOne({ ENROLLMENT_ID: enrollmentId, STATUS: 1 });
            if (!deletedEnrollment) {
                return res.status(404).json({ message: "Enrollment not found" });
            }
            deletedEnrollment.STATUS = false;
            await deletedEnrollment.save();
            res.status(200).json(deletedEnrollment);
        } catch (error) {
            res.status(500).json({ message: "Error deleting enrollment", error });
        }
    }

    async getEnrollmentsByUserID(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const enrollments = await Enrollment.find({ USER_ID: userId, STATUS: 1 });
            if (!enrollments || enrollments.length === 0) {
                return res.status(404).json({ message: "No enrollments found for this user" });
            }
            res.status(200).json(enrollments);
        } catch (error) {
            res.status(500).json({ message: "Error getting enrollments by user ID", error });
        }
    }
}

export default EnrollmentController;