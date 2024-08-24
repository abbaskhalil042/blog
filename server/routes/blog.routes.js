import express from "express";
import upload from "../middlewares/profileImageUpload.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const blogRouter = express.Router();

// blogRouter.use(verifyToken)

blogRouter.post("/create", upload.single("file"), createBlog);
blogRouter.get("/get", getBlogs);
blogRouter.get("/:id", getSingleBlog);

blogRouter.put(
  "/update/:id",

  upload.single("file"),
  updateBlog
);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
