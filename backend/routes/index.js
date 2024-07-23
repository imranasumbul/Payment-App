const express = require("express");

const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");

const rootRouter = express.Router();


rootRouter.use('/users', userRouter);
rootRouter.use('/accounts', accountRouter);
module.exports = rootRouter;