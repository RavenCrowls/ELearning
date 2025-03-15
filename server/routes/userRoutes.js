const express = require("express");
const { createUser, getAllUser, getDetailUser, deleteUser, updateUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/:userId", getDetailUser);
userRouter.delete("/:userId", deleteUser);
userRouter.put("/:userId", updateUser);

module.exports = { userRouter };
