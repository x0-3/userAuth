import express from "express";
import { findAll } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', findAll);

export default userRouter;