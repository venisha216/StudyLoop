import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ConfidenceSelector from "../../components/ConfidenceSelector";
import LoadingButton from "../../components/LoadingButton";

import "./StudySessionPage.css";

const StudySessionPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const topicData = location.state;
  if (!topicData) {
    return <p>No topic selected</p>;
  }

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfidence = (level) => {

    console.log("Confidence:", level);

    setMessage(`Confidence recorded: ${level}`);
    setLoading(true);

    // simulate saving + redirect
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);

  };

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-main">

        <Sidebar />

        <div className="dashboard-content">

  <div className="study-session-wrapper">

    <div className="study-card">

      <h1 className="study-session-title">
        {topicData?.topic}
      </h1>

      <p className="study-session-subject">
        {topicData?.subject}
      </p>

      <p className="study-session-instruction">
        Study the topic, then rate your confidence
      </p>

      <ConfidenceSelector onSelect={handleConfidence} />

      {message && (
        <div className="confidence-message">
          ✔ {message}
        </div>
      )}

      {loading && (
        <LoadingButton text="Returning to dashboard..." />
      )}

    </div>

  </div>

</div>
        </div>

      </div>

  );
};

export default StudySessionPage;