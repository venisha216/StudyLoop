import express from "express";
import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  getSubjectById
} from "../controllers/subjectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//  protect all routes
router.post("/", protect, createSubject);
router.get("/", protect, getSubjects);
router.get("/:id", protect, getSubjectById);
router.put("/:id", protect, updateSubject);
router.delete("/:id", protect, deleteSubject);

export default router;