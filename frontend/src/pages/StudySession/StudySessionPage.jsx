import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { createStudySession } from "../../services/studySessionService";
import Layout from "../../components/Layout";
import "./StudySessionPage.css";


const StudySessionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const topicData = location.state;

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleConfidence = async (level) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔥 1. GET ALL TOPICS
      const topicsRes = await axios.get(
        "http://localhost:5000/api/topics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 2. FIND MATCHING TOPIC
    // 🔍 DEBUG (keep this once)
console.log("Topics API FULL:", topicsRes);

// 🔥 SAFE EXTRACTION
let topicsArray = [];

if (Array.isArray(topicsRes.data)) {
  topicsArray = topicsRes.data;
} else if (Array.isArray(topicsRes.data.topics)) {
  topicsArray = topicsRes.data.topics;
} else if (Array.isArray(topicsRes.data.data)) {
  topicsArray = topicsRes.data.data;
} else {
  console.error("Unexpected topics format:", topicsRes.data);
  alert("Error fetching topics");
  return;
}

// 🔥 FIND TOPIC
const topic = topicsArray.find(
  (t) => t.name === topicData.topic
);

      if (!topic) {
        alert("Topic not found");
        return;
      }

      // 🔥 3. UPDATE TOPIC (confidence + revision)
      await axios.put(
        `http://localhost:5000/api/topics/${topic._id}`,
        {
          confidenceLevel: level,
          lastStudied: new Date(),
          revisionCount: topic.revisionCount + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 4. SAVE STUDY SESSION (your existing logic)
      await createStudySession({
        topicId: topic._id,
        confidence: level,
      });

      // ✅ show toast
      setToast(true);

      // ⏳ redirect to Study Plan (better UX)
      setTimeout(() => {
        const redirectPath = topicData.from || "/dashboard";

navigate(redirectPath, {
  state: { selectedSubject: topicData.subject },
});
      }, 1200);

    } catch (err) {
      console.error("Study session error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="study-session-card">

        <h2>{topicData?.topic}</h2>
        <p className="topic-sub">{topicData?.subject}</p>

        <h3>How well did you understand?</h3>

        {/* 🔥 CARDS */}
        <div className="confidence-grid">

          <div
            className="confidence-card low"
            onClick={() => handleConfidence("low")}
          >
            <div className="confidence-emoji">😟</div>
            <div className="confidence-level">Low</div>
            <div className="confidence-label">Needs revision soon</div>
          </div>

          <div
            className="confidence-card medium"
            onClick={() => handleConfidence("medium")}
          >
            <div className="confidence-emoji">😐</div>
            <div className="confidence-level">Medium</div>
            <div className="confidence-label">Almost there</div>
          </div>

          <div
            className="confidence-card high"
            onClick={() => handleConfidence("high")}
          >
            <div className="confidence-emoji">😊</div>
            <div className="confidence-level">High</div>
            <div className="confidence-label">Well understood</div>
          </div>

        </div>

      </div>

      {/* 🔥 TOAST */}
      {toast && (
        <div className="toast">
          Study session saved! Updating progress...
        </div>
      )}

    </Layout>
  );
};

export default StudySessionPage;