import { Request, Response } from 'express';
import Course, { ICourse } from '../models/Course';

class CourseController {
    async createCourse(req: Request, res: Response) {
        try {
            const {
                COURSE_ID,
                TITLE,
                INSTRUCTOR_ID,
                CREATED_DATE,
                CATEGORIES,
                SUB_CATEGORIES,
                RATING,
                DESCRIPTION,
                OUTPUT,
                PRICE,
                LEVEL,
                DURATION,
                NUMBER_OF_VIDEOS,
                ENROLLMENT_COUNT,
                APPROVAL_STATUS,
                STATUS,
                IMAGE_URL
            } = req.body;
            const newCourse = new Course({
                COURSE_ID,
                TITLE,
                INSTRUCTOR_ID,
                CREATED_DATE,
                CATEGORIES,
                SUB_CATEGORIES,
                RATING,
                DESCRIPTION,
                OUTPUT,
                PRICE,
                LEVEL,
                DURATION,
                NUMBER_OF_VIDEOS,
                ENROLLMENT_COUNT,
                APPROVAL_STATUS,
                STATUS,
                IMAGE_URL
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
                INSTRUCTOR_ID,
                CREATED_DATE,
                CATEGORIES,
                SUB_CATEGORIES,
                RATING,
                DESCRIPTION,
                OUTPUT,
                PRICE,
                LEVEL,
                DURATION,
                NUMBER_OF_VIDEOS,
                ENROLLMENT_COUNT,
                APPROVAL_STATUS,
                STATUS,
                IMAGE_URL
            } = req.body;
            const data = {
                TITLE,
                INSTRUCTOR_ID,
                CREATED_DATE,
                CATEGORIES,
                SUB_CATEGORIES,
                RATING,
                DESCRIPTION,
                OUTPUT,
                PRICE,
                LEVEL,
                DURATION,
                NUMBER_OF_VIDEOS,
                ENROLLMENT_COUNT,
                APPROVAL_STATUS,
                STATUS,
                IMAGE_URL
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

    async getPopularCourse(req: Request, res: Response) {
        try {
            const popularCourses = await Course.find({ STATUS: 1 })
                .sort({ ENROLLMENT_COUNT: -1 })
                .limit(4);
            res.status(200).json(popularCourses);
        } catch (error) {
            res.status(500).json({ message: "Error getting popular courses", error });
        }
    }

    async getNewestCourse(req: Request, res: Response) {
        try {
            const newestCourses = await Course.find({ STATUS: 1 })
                .sort({ CREATED_DATE: -1 })
                .limit(4);
            res.status(200).json(newestCourses);
        } catch (error) {
            res.status(500).json({ message: "Error getting newest courses", error });
        }
    }

    async searchCourseByName(req: Request, res: Response) {
        try {
            const { name } = req.query;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ message: 'Missing or invalid name parameter' });
            }
            // Case-insensitive partial match
            const courses = await Course.find({
                TITLE: { $regex: name, $options: 'i' },
                STATUS: 1
            });
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error searching courses by name', error });
        }
    }
}

export default CourseController;