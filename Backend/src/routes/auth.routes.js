import express from "express";
import { signup, signin, googleAuth } from "../controllers/auth.controller.js";
import {authLimiter} from "../lib/authLimiter.js"

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/signin", authLimiter, signin);
router.post("/google-auth",authLimiter, googleAuth);

export default router;
