import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    // 🔥 NEW FIELDS (DENORMALIZED)
    topicName: {
      type: String,
      required: true,
    },

    subjectName: {
      type: String,
      required: true,
    },

    confidence: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    studiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudySession", studySessionSchema);