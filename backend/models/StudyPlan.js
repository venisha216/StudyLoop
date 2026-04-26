import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    // 🔥 ACTUAL STUDY PLAN (weekly)
    plan: [
      {
        week: Number,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("StudyPlan", studyPlanSchema);