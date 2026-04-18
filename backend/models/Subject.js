import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
subjectSchema.index({ name: 1, userId: 1 }, { unique: true });

export default mongoose.model("Subject", subjectSchema);