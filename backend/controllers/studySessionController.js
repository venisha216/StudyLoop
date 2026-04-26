import StudySession from "../models/StudySession.js";
import Topic from "../models/Topic.js";

// ➕ CREATE STUDY SESSION
export const createStudySession = async (req, res) => {
  try {
    const { topicId, confidence } = req.body;

    // 🔐 VALIDATION
    if (!topicId || !confidence) {
      return res.status(400).json({
        success: false,
        message: "Topic ID and confidence are required",
      });
    }

    // 🔍 FIND TOPIC + SUBJECT
    const topic = await Topic.findById(topicId).populate("subjectId", "name");

    if (!topic || topic.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    // 🧠 CALCULATE NEXT REVIEW DATE
    const now = new Date();
    let nextReviewDate = new Date();

    switch (confidence) {
      case "low":
        nextReviewDate.setDate(now.getDate() + 1);
        break;
      case "medium":
        nextReviewDate.setDate(now.getDate() + 3);
        break;
      case "high":
        nextReviewDate.setDate(now.getDate() + 7);
        break;
      default:
        nextReviewDate = null;
    }

    // 📝 CREATE SESSION (WITH DENORMALIZED DATA)
    const session = await StudySession.create({
      userId: req.user._id,
      topicId,

      // 🔥 NEW FIELDS
      topicName: topic.name,
      subjectName: topic.subjectId?.name || "No subject",

      confidence,
      studiedAt: now,
    });

    // 🔄 UPDATE TOPIC
    topic.confidenceLevel = confidence;
    topic.revisionCount += 1;
    topic.lastStudied = now;
    topic.nextReviewDate = nextReviewDate;

    await topic.save();

    // ✅ RESPONSE
    return res.status(201).json({
      success: true,
      message: "Study session recorded successfully",
      data: {
        session,
        updatedTopic: topic,
      },
    });

  } catch (error) {
    console.error("STUDY SESSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error recording study session",
    });
  }
};


// 📥 GET STUDY SESSIONS (USER HISTORY)
export const getStudySessions = async (req, res) => {
  try {
    const sessions = await StudySession.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });

  } catch (error) {
    console.error("GET STUDY SESSIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching study sessions",
    });
  }
};