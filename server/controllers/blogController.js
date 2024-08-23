import Blog from "../models/blog.js";

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;
  try {
    if (!title || !description || !file) {
      return res.status(400).json({ msg: "all fields are required" });
    }

    const post = await Blog.create({
      title,
      description,
      image: file.filename,
    });
    return res.status(200).json({ msg: "blog created successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while creating blog", error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const posts = await Blog.find();
    return res.status(200).json({ msg: "blogs fetched successfully", posts });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while getting blogs", error });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const file = req.file;

  try {
    // Build the update object
    const updateData = {
      title,
      description,
    };

    if (file) {
      updateData.image = file.filename; // Assuming you want to store the file path
    }

    // Find and update the blog post, returning the updated document
    const post = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!post) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    return res.status(200).json({ msg: "Blog updated successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while updating the blog", error });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Blog.findByIdAndDelete(id);
    return res.status(200).json({ msg: "blog deleted successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while deleting blog", error });
  }
};
