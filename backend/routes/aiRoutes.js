import express from "express";
import multer from "multer";
import { analyzeDocument } from "../controllers/aiController.js";

const router = express.Router();

// 📦 file upload (10MB limit)
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ✅ test route
router.get("/test", (req, res) => {
  res.json({ message: "AI route working" });
});

// ✅ main route
router.post("/analyze", upload.single("file"), analyzeDocument);

export default router;