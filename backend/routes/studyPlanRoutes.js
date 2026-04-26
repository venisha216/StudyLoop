import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import StudyPlan from "../models/StudyPlan.js";

const router = express.Router();

// ✅ SAFE GET STUDY PLAN
router.get("/", protect, async (req, res) => {
  try {
    const plan = await StudyPlan.findOne({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    // ✅ no crash if empty
    if (!plan || !plan.plan) {
      return res.status(200).json({ plan: [] });
    }

    res.status(200).json({
      plan: plan.plan,
    });

  } catch (error) {
    console.error("StudyPlan ERROR:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

export default router;