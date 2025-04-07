import { Request, Response } from 'express';
import Course, { ICourse } from '../models/Course';

class CourseController {
    async createCourse(req: Request, res: Response) {
        try {
            const {
                COURSE_ID,
                TITLE,
                DESCRIPTION,
                CATEGORY_ID,
                CREATED_DATE,
                PRICE,
                STATUS,
                APPROVAL_STATUS,
                LECTURES
            } = req.body;
            const newCourse = new Course({
                COURSE_ID,
                TITLE,
                DESCRIPTION,
                CATEGORY_ID,
                CREATED_DATE,
                PRICE,
                STATUS,
                APPROVAL_STATUS,
                LECTURES
            });
            await newCourse.save();
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ message: "Error creating course", error });
        }
    }

    async getAllCourses(req: Request, res: Response) {
        try {
            const courseList = await Course.find({ STATUS: 1 });
            res.status(200).json(courseList);
        } catch (error) {
            res.status(500).json({ message: "Error getting courses", error });
        }
    }

    async getCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            const course = await Course.findOne({ COURSE_ID: courseId, STATUS: 1 });
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: "Error getting course", error });
        }
    }

    async updateCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            const {
                TITLE,
                DESCRIPTION,
                CATEGORY_ID,
                CREATED_DATE,
                PRICE,
                APPROVAL_STATUS,
                LECTURES
            } = req.body;
            const data = {
                TITLE,
                DESCRIPTION,
                CATEGORY_ID,
                CREATED_DATE,
                PRICE,
                APPROVAL_STATUS,
                LECTURES
            };
            const updatedCourse = await Course.findOneAndUpdate(
                { COURSE_ID: courseId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(500).json({ message: "Error updating course", error });
        }
    }

    async deleteCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            const deletedCourse = await Course.findOne({ COURSE_ID: courseId, STATUS: 1 });
            if (!deletedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }
            deletedCourse.STATUS = false;
            await deletedCourse.save();
            res.status(200).json(deletedCourse);
        } catch (error) {
            res.status(500).json({ message: "Error deleting course", error });
        }
    }
}

export default CourseController;