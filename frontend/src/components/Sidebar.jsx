import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open, sidebarRef }) => {

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${open ? "open" : ""}`}
    >

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/subjects">Subjects</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/study-plan">Study Plan</Link>
      <Link to="/profile">Profile</Link>

    </div>
  );
};

export default Sidebar;