import Topic from "../models/Topic.js";
import Subject from "../models/Subject.js";

// ➕ CREATE TOPIC
export const createTopic = async (req, res) => {
  try {
    const { name, subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Subject is required",
      });
    }

    const subject = await Subject.findById(subjectId);

    if (!subject || subject.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const topic = await Topic.create({
      name,
      subjectId,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: topic,
    });
  } catch (error) {
    console.error("CREATE TOPIC ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Topic already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating topic",
    });
  }
};

// 📥 GET TOPICS (ALL or by subject)
export const getTopics = async (req, res) => {
  try {
    const { subjectId } = req.query;

    const filter = {
      userId: req.user._id,
    };

    if (subjectId) {
      filter.subjectId = subjectId;
    }

    const topics = await Topic.find(filter)
    .populate("subjectId", "name")
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Topics fetched successfully",
      count: topics.length,
      data: topics,
    });
  } catch (error) {
    console.error("GET TOPICS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching topics",
    });
  }
};

// ✏️ UPDATE TOPIC
export const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      confidenceLevel,
      lastStudied,
      revisionCount,
    } = req.body;

    const topic = await Topic.findById(id);

    if (!topic || topic.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    // ✅ SAFE FIELD UPDATES

    if (name && name.trim()) {
      topic.name = name.trim();
    }

    if (confidenceLevel) {
      topic.confidenceLevel = confidenceLevel;
    }

    // ✅ ONLY update if valid date
    if (lastStudied && !isNaN(Date.parse(lastStudied))) {
      topic.lastStudied = new Date(lastStudied);
    }

    // ✅ ONLY update if number
    if (typeof revisionCount === "number") {
      topic.revisionCount = revisionCount;
    }

    const updated = await topic.save();

    return res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("UPDATE TOPIC ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Topic already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error updating topic",
    });
  }
};

// ❌ DELETE TOPIC
export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findById(id);

    if (!topic || topic.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    await topic.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Topic deleted successfully",
      data: topic,
    });
  } catch (error) {
    console.error("DELETE TOPIC ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting topic",
    });
  }
};