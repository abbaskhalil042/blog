import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    file: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
