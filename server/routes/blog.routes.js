import express from "express";
import upload from "../middlewares/profileImageUpload.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const blogRouter = express.Router();

blogRouter.use(verifyToken)

blogRouter.post("/create", upload.single("image"), createBlog);
blogRouter.get("/get", getBlogs);
blogRouter.put("/update/:id", upload.single("image"), updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;

