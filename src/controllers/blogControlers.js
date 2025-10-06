import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { authorId } = req.params;
    const { title, description, content, image, category } = req.body;
    if (!authorId) {
      return res.status(400).json({ message: "Author ID is required" });
    }
    //new blog
    const newBlog = new Blog({
      title,
      description,
      content,
      image,
      category,
      authorId,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteBlog = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateBlog = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
