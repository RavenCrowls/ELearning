import { Request, Response } from "express";
import Comment, { IComment } from "../models/Comment";

class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const { COMMENT_ID, VIDEO_ID, USER_ID, CONTENT, PARENT_COMMENT_ID } =
        req.body;

      const newComment = new Comment({
        COMMENT_ID,
        VIDEO_ID,
        USER_ID,
        CONTENT,
        PARENT_COMMENT_ID: PARENT_COMMENT_ID || null,
        CREATED_AT: new Date(),
        UPDATED_AT: new Date(),
        STATUS: true,
      });

      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: "Error creating comment", error });
    }
  }

  async getCommentsByVideo(req: Request, res: Response) {
    try {
      const { videoId } = req.params;

      const comments = await Comment.find({
        VIDEO_ID: videoId,
        STATUS: true,
      }).sort({ CREATED_AT: -1 });

      const commentMap = new Map<string, any>();
      const rootComments: any[] = [];

      comments.forEach((comment) => {
        const commentObj: any = comment.toObject();
        commentObj.replies = [];
        commentMap.set(commentObj.COMMENT_ID, commentObj);
      });

      comments.forEach((comment) => {
        const commentObj = commentMap.get(comment.COMMENT_ID);
        if (comment.PARENT_COMMENT_ID) {
          const parent = commentMap.get(comment.PARENT_COMMENT_ID);
          if (parent) {
            parent.replies.push(commentObj);
          }
        } else {
          rootComments.push(commentObj);
        }
      });

      res.status(200).json(rootComments);
    } catch (error) {
      res.status(500).json({ message: "Error getting comments", error });
    }
  }

  async getComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findOne({
        COMMENT_ID: commentId,
        STATUS: true,
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Error getting comment", error });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { CONTENT } = req.body;

      const updatedComment = await Comment.findOneAndUpdate(
        { COMMENT_ID: commentId, STATUS: true },
        {
          CONTENT,
          UPDATED_AT: new Date(),
        },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: "Error updating comment", error });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      const deletedComment = await Comment.findOneAndUpdate(
        { COMMENT_ID: commentId, STATUS: true },
        { STATUS: false },
        { new: true }
      );

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  }

  async getReplies(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      const replies = await Comment.find({
        PARENT_COMMENT_ID: commentId,
        STATUS: true,
      }).sort({ CREATED_AT: 1 });

      res.status(200).json(replies);
    } catch (error) {
      res.status(500).json({ message: "Error getting replies", error });
    }
  }
}

export default CommentController;
