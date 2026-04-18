import express from "express";
import {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.post("/", protect, createTopic);
router.get("/", protect, getTopics);
router.put("/:id", protect, updateTopic);   //  edit
router.delete("/:id", protect, deleteTopic);

export default router;