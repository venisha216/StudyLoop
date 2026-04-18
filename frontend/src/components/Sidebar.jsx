import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen }) => {

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/subjects">Subjects</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/study-plan">Study Plan</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/chatbot">Chatbot</Link>
    </div>
  );
};

export default Sidebar;