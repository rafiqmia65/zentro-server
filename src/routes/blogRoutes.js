import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogControllers.js";

const router = express.Router();

// Route to create a new blog
router.post("/add-blog/:authorId", createBlog);

// Route to get all blogs
router.get("/get-all-blog", getAllBlog);

// Route to get a single blog by its ID
router.get("/get-single-blog/:blogId", getSingleBlog);

// Route to update a blog by its ID
router.put("/update-blog/:blogId", updateBlog);

// Route to delete a blog by its ID
router.delete("/delete-blog/:blogId", deleteBlog);

export default router;
