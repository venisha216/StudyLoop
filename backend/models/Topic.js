import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    confidenceLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    revisionCount: {
      type: Number,
      default: 0,
    },

    lastStudied: {
      type: Date,
      default: null,
    },

    nextReviewDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// 🚫 prevent duplicate topics in same subject for same user
topicSchema.index(
  { name: 1, subjectId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.model("Topic", topicSchema);