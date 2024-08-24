import express from "express";
import { login, signup } from "../controllers/user.js";
// import upload from "../middlewares/profileImageUpload.js";
import uploadProfile from "../middlewares/profileImageUpload.js";

const userRouter = express.Router();

userRouter.post("/signup", uploadProfile.single("profileImage"), signup);
userRouter.post("/login", login);

export default userRouter;
