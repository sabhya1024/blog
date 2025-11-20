import express from "express";
import { createBlog, getLatestBlogs } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middleware/verifyToken.js";

const router = express.Router();

//protected route
router.post("/create-blog", verifyJWT, createBlog);

//public route
router.post("/latest-blogs", getLatestBlogs);

export default router;
