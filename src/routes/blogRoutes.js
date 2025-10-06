import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getSingleBlog,
} from "../controllers/blogControlers.js";

const router = express.Router();

router.post("/add-blog/:authorId", createBlog);
router.get("/get-all-blog", getAllBlog);
router.get("/get-single-blog/:blogId", getSingleBlog);

router.delete("/delete-blog/:blogId", deleteBlog);

export default router;
