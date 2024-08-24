import Blog from "../models/blog.js";

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file; // Multer will attach the uploaded file info to req.file

  try {
    if (!title || !description || !file) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const post = await Blog.create({
      title,
      description,
      image: file.path, // Cloudinary URL for the uploaded image
    });

    return res.status(200).json({ msg: "Blog created successfully", post });
  } catch (error) {
    console.error("Error creating blog:", error);

    return res.status(500).json({
      msg: "Something went wrong while creating the blog",
      // error: error,
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
  console.log("File:", file); // Check if the file object is being received

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

    const post = await Blog.findByIdAndUpdate({id:_id}, updateData, { new: true });

    if (!post) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    return res.status(200).json({ msg: "Blog updated successfully", post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return res.status(500).json({ msg: "Something went wrong while updating the blog", error });
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
    const post = await Blog.findById(id);
    return res.status(200).json({ msg: "blog fetched successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while getting blog", error });
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
