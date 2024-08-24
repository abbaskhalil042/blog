import Blog from "../models/blog.js";

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  console.log("Request body:", req.body);
  console.log("Uploaded file:", file);

  try {
    if (!title || !description || !file) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const imageUrl = file.path; // Cloudinary URL for the uploaded image

    const post = await Blog.create({
      title,
      description,
      file: imageUrl,
    });

    return res.status(200).json({ msg: "Blog created successfully", post });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    return res.status(500).json({
      msg: "Something went wrong while creating the blog",
      error: error.message,
    });
  }
};

//**** update
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const file = req.file;

  console.log("Blog ID:", id);
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("File received:", file); // Check if the file object is being received

  if (!title || !description) {
    return res.status(400).json({ msg: "Title and description are required" });
  }

  try {
    const updateData = {
      title,
      description,
    };

    if (file) {
      updateData.image = file.path;
    }

    console.log("Update data:", updateData);

    const post = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
    console.log("Post after update:", post); // Ensure the updated post is logged

    if (!post) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    return res.status(200).json({ msg: "Blog updated successfully", post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return res.status(500).json({
      msg: "Something went wrong while updating the blog",
      error: error.message,
    });
  }
};

//*get

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

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findById(id).exec();

    if (!post) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Blog.findByIdAndDelete(id);
    console.log("Blog post deleted:", post);
    return res.status(200).json({ msg: "blog deleted successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while deleting blog", error });
  }
};
