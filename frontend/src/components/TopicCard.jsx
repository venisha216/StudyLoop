import { useNavigate } from "react-router-dom";
import RiskIndicator from "./RiskIndicator";
import "./TopicCard.css";

const TopicCard = ({ data }) => {

  const navigate = useNavigate();

  const openTopic = () => {
    navigate("/topic-details", { state: data });
  };

  return (
    <div className="topic-card" onClick={openTopic}>

      <h3>{data.topic}</h3>
      <p>{data.subject}</p>

      <RiskIndicator level={data.risk} />

    </div>
  );
};

export default TopicCard;