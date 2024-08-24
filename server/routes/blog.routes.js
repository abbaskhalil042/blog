import express from "express";
// import upload from "../middlewares/profileImageUpload.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import uploadPost from "../middlewares/postImageUpload.js";

const blogRouter = express.Router();

// blogRouter.use(verifyToken)

blogRouter.post("/create", uploadPost.single("file"), createBlog);
blogRouter.get("/get", getBlogs);
blogRouter.get("/:id", getSingleBlog);

blogRouter.put(
  "/update/:id",

  uploadPost.single("file"),
  updateBlog
);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
