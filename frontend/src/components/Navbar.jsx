import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {

  return (
    <div className="navbar">

      <div className="nav-left">

        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>

        <h2 className="logo">StudyLoop</h2>

      </div>

      <div className="nav-right">
        Welcome, Student
      </div>

    </div>
  );
};

export default Navbar;