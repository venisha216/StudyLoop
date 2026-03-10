import "./RiskIndicator.css";

const RiskIndicator = ({ level }) => {
  return <span className={`risk ${level.toLowerCase()}`}>{level}</span>;
};

export default RiskIndicator;