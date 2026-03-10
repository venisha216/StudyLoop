import "./ConfidenceSelector.css";

const ConfidenceSelector = ({ onSelect }) => {

  const options = [
    { level: "Low", emoji: "😟", label: "Not confident" },
    { level: "Medium", emoji: "😐", label: "Somewhat confident" },
    { level: "High", emoji: "😊", label: "Very confident" }
  ];

  return (
    <div className="confidence-grid">

      {options.map((option) => (
        <div
          key={option.level}
          className={`confidence-card ${option.level.toLowerCase()}`}
          onClick={() => onSelect(option.level)}
        >

          <div className="confidence-emoji">{option.emoji}</div>

          <div className="confidence-level">
            {option.level}
          </div>

          <div className="confidence-label">
            {option.label}
          </div>

        </div>
      ))}

    </div>
  );
};

export default ConfidenceSelector;