import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

const {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    signup,
    login
} = userController;

router.post("/", createUser.bind(userController));
router.get("/", getAllUsers.bind(userController));
router.get("/:userId", getUser.bind(userController));
router.delete("/:userId", deleteUser.bind(userController));
router.put("/:userId", updateUser.bind(userController));
router.post('/signup', signup.bind(userController));
router.post('/login', login.bind(userController));

export { router as userRouter };