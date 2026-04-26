import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [streak, setStreak] = useState(0);

  // ---------------------------
  // 🔥 FETCH STUDY SESSIONS
  // ---------------------------
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/study-session",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sessions =
          res.data.data ||
          res.data.sessions ||
          res.data ||
          [];

        calculateStreak(sessions);

      } catch (err) {
        console.error("Streak fetch error:", err);
      }
    };

    fetchSessions();
  }, []);

  // ---------------------------
  // 🔥 STREAK LOGIC
  // ---------------------------
  const calculateStreak = (sessions) => {
    if (!sessions.length) {
      setStreak(0);
      return;
    }

    // unique study days
    const dates = [
      ...new Set(
        sessions.map((s) =>
          new Date(s.createdAt).toDateString()
        )
      ),
    ];

    // sort latest first
    dates.sort((a, b) => new Date(b) - new Date(a));

    let streakCount = 0;
    let currentDate = new Date();

    for (let i = 0; i < dates.length; i++) {
      const sessionDate = new Date(dates[i]);

      const diff =
        (new Date(currentDate).setHours(0, 0, 0, 0) -
          new Date(sessionDate).setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24);

      if (diff === 0 || diff === 1) {
        streakCount++;
        currentDate = sessionDate;
      } else {
        break;
      }
    }

    setStreak(streakCount);
  };

  // ---------------------------
  // 🔓 LOGOUT
  // ---------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">

      {/* LEFT - DO NOT TOUCH */}
      <div className="nav-left">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <h2 className="logo">StudyLoop</h2>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* 🔥 STREAK */}
        <div className="streak-box">
          🔥 <span>{streak}</span> day streak
        </div>

        {/* 👤 PROFILE */}
        <div className="profile-wrapper">

          <div
            className="profile-icon"
            onClick={() => setOpen(!open)}
          >
            <i className="fa-solid fa-user"></i>
          </div>

          {/* ⬇️ DROPDOWN */}
          {open && (
            <div className="dropdown">
              <div onClick={() => navigate("/profile")}>
                Profile
              </div>
              <div onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navbar;