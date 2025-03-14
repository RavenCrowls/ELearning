const express = require("express");
const { userRouter } = require("./userRoutes");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);

module.exports = {
    rootRouter,
};
