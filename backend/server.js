import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import studySessionRoutes from "./routes/studySessionRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
import studyPlanRoutes from "./routes/studyPlanRoutes.js";


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/study-session", studySessionRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/studyplan", studyPlanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});