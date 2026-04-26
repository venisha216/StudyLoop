import express from "express";
import multer from "multer";

import { generateStudyPlan } from "../controllers/plannerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// File upload config
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/generate-plan",
  authMiddleware,
  upload.fields([
    { name: "syllabus", maxCount: 1 },
    { name: "notes", maxCount: 1 },
  ]),
  generateStudyPlan
);

export default router;