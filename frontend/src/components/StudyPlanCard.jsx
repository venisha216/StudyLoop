import { useNavigate } from "react-router-dom";
import RiskIndicator from "./RiskIndicator";
import "./StudyPlanCard.css";

const StudyPlanCard = ({ data, onSkip }) => {

  const navigate = useNavigate();

  const handleStudy = () => {
    navigate("/study-session", { state: data });
  };

  const handleSkip = () => {
    onSkip(data);
  };

  

  return (
    <div className="plan-card">

      <h3>{data.topic}</h3>
      <p>{data.subject}</p>

      <RiskIndicator level={data.risk} />

      <div className="plan-actions">

        <button className="study-btn" onClick={handleStudy}>
          Study Now
        </button>

        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>

      </div>

    </div>
  );
};

export default StudyPlanCard;