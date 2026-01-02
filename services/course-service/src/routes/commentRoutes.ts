import { Router } from "express";
import CommentController from "../controllers/commentController";

const router = Router();
const commentController = new CommentController();

const {
  createComment,
  getCommentsByVideo,
  getComment,
  updateComment,
  deleteComment,
  getReplies,
} = commentController;

// Comment routes
router.post("/", createComment.bind(commentController));
router.get("/video/:videoId", getCommentsByVideo.bind(commentController));
router.get("/:commentId", getComment.bind(commentController));
router.put("/:commentId", updateComment.bind(commentController));
router.delete("/:commentId", deleteComment.bind(commentController));
router.get("/:commentId/replies", getReplies.bind(commentController));

export { router as commentRouter };
