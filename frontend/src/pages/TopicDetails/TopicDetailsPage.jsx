import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import RiskIndicator from "../../components/RiskIndicator";

import "./TopicDetailsPage.css";

const TopicDetailsPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const topicData = location.state;

  const startStudy = () => {
    navigate("/study-session", { state: topicData });
  };

  return (
    <Layout>

      <div className="topic-details-card">

        <h1>{topicData?.topic}</h1>

        <p className="topic-subject">
          {topicData?.subject}
        </p>

        <div className="risk-section">

          <span>Current Risk</span>

          <RiskIndicator level={topicData?.risk} />

        </div>

        <div className="topic-info">

          <div className="info-box">
            <span>Last Studied</span>
            <p>Not studied yet</p>
          </div>

          <div className="info-box">
            <span>Revisions</span>
            <p>0</p>
          </div>

        </div>

        <button
          className="study-now-btn"
          onClick={startStudy}
        >
          Study Topic
        </button>

      </div>

    </Layout>
  );
};

export default TopicDetailsPage;