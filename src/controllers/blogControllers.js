import Blog from "../models/blogModel.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { authorId } = req.params;
    const { title, description, content, image, category } = req.body;

    // Check if authorId is provided
    if (!authorId) {
      return res.status(400).json({ message: "Author ID is required" });
    }

    // Create a new blog instance
    const newBlog = new Blog({
      title,
      description,
      content,
      image,
      category,
      authorId,
    });

    // Save the blog to the database
    await newBlog.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs
export const getAllBlog = async (req, res) => {
  try {
    // Fetch all blogs and populate author info
    const blogs = await Blog.find()
      .populate("authorId")
      .sort({ createdAt: -1 }); // Newest blogs first

    // Send response
    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
export const getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Check if blogId is provided
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    // Find the blog and populate author info
    const blog = await Blog.findById(blogId).populate(
      "authorId",
      "name email profileImage"
    );

    // If blog not found
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Check if blogId is provided
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    // Find and delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // If blog not found
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description, content, image, category } = req.body;

    // Check if blogId is provided
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    // Find the blog and update it
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, content, image, category },
      { new: true, runValidators: true }
    ).populate("authorId", "name email profileImage");

    // If blog not found
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
