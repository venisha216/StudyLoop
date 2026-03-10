import { useNavigate } from "react-router-dom";
import "./SubjectCard.css";

const SubjectCard = ({ data }) => {

  const navigate = useNavigate();

  const openSubject = () => {
    navigate("/topics", { state: data });
  };

  return (
    <div className="subject-card" onClick={openSubject}>

      <h3>{data.name}</h3>
      <p>{data.topics} topics</p>

    </div>
  );
};

export default SubjectCard;