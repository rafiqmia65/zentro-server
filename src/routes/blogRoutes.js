import express from "express";
import { createBlog, getAllBlog, getSingleBlog } from "../controllers/blogControlers.js";

const router = express.Router();

router.post("/add-blog/:authorId", createBlog);
router.get("/get-all-blog", getAllBlog);
router.get("/get-single-blog/:blogId", getSingleBlog);

export default router;
