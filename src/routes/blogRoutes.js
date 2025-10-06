import express from "express";
import { createBlog, getAllBlog } from "../controllers/blogControlers.js";

const router = express.Router();

router.post("/add-blog/:authorId", createBlog);


export default router;
