import express from "express";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    res.json({ message: "Signup route working" });
  } catch (error) {
    res.status(500).json({ message: "Error in signup" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    res.json({ message: "Login route working" });
  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
});

export default router;