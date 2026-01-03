import { Router } from "express";
import UserController from "../controllers/userController";
import { requireAuth } from "../middleware/clerkMiddleware";

const router = Router();
const userController = new UserController();

const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  syncUserFromClerk,
} = userController;

router.post("/", createUser.bind(userController));
router.post("/sync", syncUserFromClerk.bind(userController)); // No auth required for initial sync
router.get("/", getAllUsers.bind(userController));
router.get("/:userId", getUser.bind(userController));

router.delete("/:userId", requireAuth, deleteUser.bind(userController));
router.put("/:userId", requireAuth, updateUser.bind(userController));

export { router as userRouter };
