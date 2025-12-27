import { Request, Response } from "express";
import Lecture, { ILecture } from "../models/Lecture";

class LectureController {
  async createLecture(req: Request, res: Response) {
    try {
      const { COURSE_ID, LECTURE_ID, TITLE, ORDER, STATUS } = req.body;
      const newLecture = new Lecture({
        COURSE_ID,
        LECTURE_ID,
        TITLE,
        ORDER,
        STATUS,
      });
      await newLecture.save();
      res.status(201).json(newLecture);
    } catch (error) {
      res.status(500).json({ message: "Error creating lecture", error });
    }
  }

  async getAllLectures(req: Request, res: Response) {
    try {
      const lectures = await Lecture.find({ STATUS: 1 });
      res.status(200).json(lectures);
    } catch (error) {
      res.status(500).json({ message: "Error getting lectures", error });
    }
  }

  async getLecture(req: Request, res: Response) {
    try {
      const { lectureId } = req.params;
      const lecture = await Lecture.findOne({
        LECTURE_ID: lectureId,
        STATUS: 1,
      });
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
      res.status(200).json(lecture);
    } catch (error) {
      res.status(500).json({ message: "Error getting lecture", error });
    }
  }

  async updateLecture(req: Request, res: Response) {
    try {
      const { lectureId } = req.params;
      const { COURSE_ID, TITLE, ORDER } = req.body;
      const data = {
        COURSE_ID,
        TITLE,
        ORDER,
      };
      const updatedLecture = await Lecture.findOneAndUpdate(
        { LECTURE_ID: lectureId, STATUS: 1 },
        data,
        { new: true }
      );
      if (!updatedLecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
      res.status(200).json(updatedLecture);
    } catch (error) {
      res.status(500).json({ message: "Error updating lecture", error });
    }
  }

  async deleteLecture(req: Request, res: Response) {
    try {
      const { lectureId } = req.params;
      const deletedLecture = await Lecture.findOne({
        LECTURE_ID: lectureId,
        STATUS: 1,
      });
      if (!deletedLecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
      deletedLecture.STATUS = false;
      await deletedLecture.save();
      res.status(200).json(deletedLecture);
    } catch (error) {
      res.status(500).json({ message: "Error deleting lecture", error });
    }
  }

  async getLecturesByCourseID(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const lectures = await Lecture.find({
        COURSE_ID: courseId,
        STATUS: true,
      }).sort({ ORDER: 1 });
      res.status(200).json(lectures);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting lectures by course ID", error });
    }
  }
}

export default LectureController;
