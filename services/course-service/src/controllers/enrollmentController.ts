import { Request, Response } from "express";
import Enrollment, { IEnrollment } from "../models/Enrollment";

class EnrollmentController {
  async createEnrollment(req: Request, res: Response) {
    try {
      const { ENROLLMENT_ID, COURSE_ID, USER_ID, PROGRESS, STATUS, WATCHED } =
        req.body;
      const newEnrollment = new Enrollment({
        ENROLLMENT_ID,
        COURSE_ID,
        USER_ID,
        PROGRESS,
        STATUS,
        WATCHED,
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
      const enrollment = await Enrollment.findOne({
        ENROLLMENT_ID: enrollmentId,
        STATUS: 1,
      });
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
      const { COURSE_ID, USER_ID, PROGRESS, WATCHED } = req.body;
      const data = {
        COURSE_ID,
        USER_ID,
        PROGRESS,
        WATCHED,
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
      const deletedEnrollment = await Enrollment.findOne({
        ENROLLMENT_ID: enrollmentId,
        STATUS: 1,
      });
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
      const enrollments = await Enrollment.find({ USER_ID: userId, STATUS: 1 })
        .select("-__v")
        .lean(); // Better performance for read-only data

      if (!enrollments || enrollments.length === 0) {
        return res
          .status(404)
          .json({ message: "No enrollments found for this user" });
      }
      res.status(200).json(enrollments);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting enrollments by user ID", error });
    }
  }

  async updateProgress(req: Request, res: Response) {
    try {
      const { enrollmentId } = req.params;
      const { VIDEO_ID, COURSE_ID } = req.body;
      if (!VIDEO_ID || !COURSE_ID) {
        return res
          .status(400)
          .json({ message: "VIDEO_ID and COURSE_ID are required" });
      }
      const enrollment = await Enrollment.findOne({
        ENROLLMENT_ID: enrollmentId,
        STATUS: 1,
      });
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      const index = enrollment.WATCHED.indexOf(VIDEO_ID);
      if (index !== -1) {
        enrollment.WATCHED.splice(index, 1);
      } else {
        enrollment.WATCHED.push(VIDEO_ID);
      }
      const courseRes = await fetch(
        `http://localhost:5003/api/courses/${COURSE_ID}`
      );
      if (!courseRes.ok) {
        return res.status(500).json({ message: "Failed to fetch course info" });
      }
      const courseData = await courseRes.json();
      const totalVideos = courseData.NUMBER_OF_VIDEOS || 1;
      enrollment.PROGRESS = Math.floor(
        (enrollment.WATCHED.length / totalVideos) * 100
      );
      await enrollment.save();
      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Error updating progress", error });
    }
  }
}

export default EnrollmentController;
