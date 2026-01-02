import { Request, Response } from "express";
import Rating, { IRating } from "../models/Rating";
import Course from "../models/Course";

class RatingController {
  async createRating(req: Request, res: Response) {
    try {
      const {
        RATING_ID,
        COURSE_ID,
        USER_ID,
        RATING: ratingValue,
        COMMENT,
      } = req.body;

      const existingRating = await Rating.findOne({
        COURSE_ID,
        USER_ID,
        STATUS: true,
      });

      if (existingRating) {
        return res.status(400).json({
          message:
            "You have already rated this course. Please update your existing rating instead.",
        });
      }

      const newRating = new Rating({
        RATING_ID,
        COURSE_ID,
        USER_ID,
        RATING: ratingValue,
        COMMENT: COMMENT || "",
        CREATED_AT: new Date(),
        UPDATED_AT: new Date(),
        STATUS: true,
      });

      await newRating.save();

      await this.updateCourseAverageRating(COURSE_ID);

      res.status(201).json(newRating);
    } catch (error) {
      res.status(500).json({ message: "Error creating rating", error });
    }
  }

  async getRatingsByCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const ratings = await Rating.find({
        COURSE_ID: courseId,
        STATUS: true,
      })
        .sort({ CREATED_AT: -1 })
        .skip(skip)
        .limit(limit);

      const totalRatings = await Rating.countDocuments({
        COURSE_ID: courseId,
        STATUS: true,
      });

      const ratingStats = await Rating.aggregate([
        { $match: { COURSE_ID: courseId, STATUS: true } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$RATING" },
            totalRatings: { $sum: 1 },
            fiveStars: { $sum: { $cond: [{ $eq: ["$RATING", 5] }, 1, 0] } },
            fourStars: { $sum: { $cond: [{ $eq: ["$RATING", 4] }, 1, 0] } },
            threeStars: { $sum: { $cond: [{ $eq: ["$RATING", 3] }, 1, 0] } },
            twoStars: { $sum: { $cond: [{ $eq: ["$RATING", 2] }, 1, 0] } },
            oneStar: { $sum: { $cond: [{ $eq: ["$RATING", 1] }, 1, 0] } },
          },
        },
      ]);

      res.status(200).json({
        ratings,
        pagination: {
          page,
          limit,
          total: totalRatings,
          pages: Math.ceil(totalRatings / limit),
        },
        statistics:
          ratingStats.length > 0
            ? ratingStats[0]
            : {
                averageRating: 0,
                totalRatings: 0,
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStar: 0,
              },
      });
    } catch (error) {
      res.status(500).json({ message: "Error getting ratings", error });
    }
  }

  async getRating(req: Request, res: Response) {
    try {
      const { ratingId } = req.params;
      const rating = await Rating.findOne({
        RATING_ID: ratingId,
        STATUS: true,
      });

      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }

      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ message: "Error getting rating", error });
    }
  }

  async getUserRatingForCourse(req: Request, res: Response) {
    try {
      const { courseId, userId } = req.params;
      const rating = await Rating.findOne({
        COURSE_ID: courseId,
        USER_ID: userId,
        STATUS: true,
      });

      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }

      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ message: "Error getting user rating", error });
    }
  }

  async updateRating(req: Request, res: Response) {
    try {
      const { ratingId } = req.params;
      const { RATING: ratingValue, COMMENT } = req.body;

      const updateData: any = {
        UPDATED_AT: new Date(),
      };

      if (ratingValue !== undefined) {
        updateData.RATING = ratingValue;
      }
      if (COMMENT !== undefined) {
        updateData.COMMENT = COMMENT;
      }

      const updatedRating = await Rating.findOneAndUpdate(
        { RATING_ID: ratingId, STATUS: true },
        updateData,
        { new: true }
      );

      if (!updatedRating) {
        return res.status(404).json({ message: "Rating not found" });
      }

      await this.updateCourseAverageRating(updatedRating.COURSE_ID);

      res.status(200).json(updatedRating);
    } catch (error) {
      res.status(500).json({ message: "Error updating rating", error });
    }
  }

  async deleteRating(req: Request, res: Response) {
    try {
      const { ratingId } = req.params;

      const deletedRating = await Rating.findOneAndUpdate(
        { RATING_ID: ratingId, STATUS: true },
        { STATUS: false },
        { new: true }
      );

      if (!deletedRating) {
        return res.status(404).json({ message: "Rating not found" });
      }

      await this.updateCourseAverageRating(deletedRating.COURSE_ID);

      res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting rating", error });
    }
  }

  private async updateCourseAverageRating(courseId: string) {
    try {
      const ratingStats = await Rating.aggregate([
        { $match: { COURSE_ID: courseId, STATUS: true } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$RATING" },
            totalRatings: { $sum: 1 },
          },
        },
      ]);

      if (ratingStats.length > 0) {
        await Course.findOneAndUpdate(
          { COURSE_ID: courseId },
          {
            AVERAGE_RATING: parseFloat(ratingStats[0].averageRating.toFixed(1)),
            TOTAL_RATINGS: ratingStats[0].totalRatings,
          }
        );
      } else {
        await Course.findOneAndUpdate(
          { COURSE_ID: courseId },
          {
            AVERAGE_RATING: 0,
            TOTAL_RATINGS: 0,
          }
        );
      }
    } catch (error) {
      console.error("Error updating course average rating:", error);
    }
  }
}

export default RatingController;
