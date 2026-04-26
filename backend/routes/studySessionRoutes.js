import express from "express";
import { createStudySession, getStudySessions } from "../controllers/studySessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createStudySession);
router.get("/", protect, getStudySessions);

export default router;