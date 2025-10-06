import express from "express";
import { createBlog, getAllBlog } from "../controllers/blogControlers.js";

const router = express.Router();

router.post("/add-blog/:authorId", createBlog);
router.get("/get-all-blog", getAllBlog);

export default router;
