import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Layout from "../../components/Layout";
import RiskIndicator from "../../components/RiskIndicator";
import TopicEditModal from "../../components/TopicEditModal";

import "./TopicDetailsPage.css";

const TopicDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

 const [topicData, setTopicData] = useState(location.state);
  const [showEditModal, setShowEditModal] = useState(false);

  const startStudy = () => {
    navigate("/study-session", { state: topicData });
  };

  // ✅ format date nicely
  const formatDate = (date) => {
    if (!date) return "Not studied yet";
    return new Date(date).toLocaleDateString();
  };

  return (
    <Layout>

      <div className="topic-details-card">

        {/* HEADER */}
        <div className="details-header">
          <h1>{topicData?.topic || "No Topic"}</h1>

          <button
            className="edit-btn"
            onClick={() => setShowEditModal(true)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        <p className="topic-subject">
          {topicData?.subject || "No subject"}
        </p>

        {/* RISK */}
        <div className="risk-section">
          <span>Current Risk</span>
          <RiskIndicator level={topicData?.risk || "low"} />
        </div>

        {/* INFO */}
        <div className="topic-info">

          <div className="info-box">
            <span>Last Studied</span>
            <p>{formatDate(topicData?.lastStudied)}</p>
          </div>

          <div className="info-box">
            <span>Revisions</span>
            <p>{topicData?.revisionCount || 0}</p>
          </div>

        </div>

        {/* BUTTON */}
        <button
          className="study-now-btn"
          onClick={startStudy}
        >
          Study Topic
        </button>

      </div>

      {/* 🔥 EDIT MODAL */}
      {showEditModal && (
        <TopicEditModal
          topic={topicData}
          onClose={() => setShowEditModal(false)}
          onUpdate={(updatedTopic) => {
            console.log("UPDATED TOPIC RECEIVED:", updatedTopic);
            if (!updatedTopic) return;
            setTopicData({
              _id: updatedTopic._id,
              topic: updatedTopic.name,
              subject: topicData.subject,
              risk: updatedTopic.confidenceLevel,
              lastStudied: updatedTopic.lastStudied,
              revisionCount: updatedTopic.revisionCount,
            });
          }}
          // simple refresh
        />
      )}

    </Layout>
  );
};

export default TopicDetailsPage;