import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">

      <div className="nav-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>

        <h2>StudyLoop</h2>
      </div>

      <div className="navbar-user">
        Welcome, Student
      </div>

    </div>
  );
};

export default Navbar;