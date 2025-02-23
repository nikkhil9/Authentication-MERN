import express from "express";
import userAuth from "../middleware/userAuth.js";
import userModel from "../models/userModel.js";
import { getUserData } from "../controllers/userController.js";
const userRouter =express.Router();

userRouter.get('/data',userAuth,getUserData);
export default userRouter;
