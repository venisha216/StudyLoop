import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import "./ProfilePage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProfilePage = () => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );

  // ✅ USER FIX
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.name || user.email || "Student";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [subRes, topicRes, sessionRes] = await Promise.all([
          axios.get("http://localhost:5000/api/subjects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/topics", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/study-session", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSubjects(subRes.data.data || subRes.data || []);
        setTopics(topicRes.data.data || topicRes.data || []);
        setSessions(sessionRes.data.data || sessionRes.data || []);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // 📊 GRAPH DATA
  const sessionMap = {};
  sessions.forEach((s) => {
    const day = new Date(s.createdAt).toLocaleDateString();
    sessionMap[day] = (sessionMap[day] || 0) + 1;
  });

  const graphData = Object.keys(sessionMap).map((day) => ({
    date: day,
    sessions: sessionMap[day],
  }));

  // 📚 REVISIONS
  const revisionMap = {};
  topics.forEach((t) => {
    const subject = t.subjectId?.name || "Unknown";
    revisionMap[subject] =
      (revisionMap[subject] || 0) + (t.revisionCount || 0);
  });

  const revisionList = Object.keys(revisionMap).map((sub) => ({
    subject: sub,
    count: revisionMap[sub],
  }));

  // 🏆 ACHIEVEMENTS
  const achievements = [];

  if (sessions.length >= 5) achievements.push("🎯 Starter");
  if (sessions.length >= 20) achievements.push("🔥 Consistent");
  if (topics.length >= 10) achievements.push("📚 Explorer");
  if (topics.filter((t) => t.confidenceLevel === "high").length >= 5)
    achievements.push("💪 Mastery");

  // 🖼 PROFILE PIC
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePic", reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <h1 className="page-title">Profile</h1>

      <div className="profile-grid">

        {/* LEFT CARD */}
        <div className="profile-card">

          <div className="profile-pic">
            <img
              src={
                profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
            />

            <button
              className="edit-btn"
              onClick={() =>
                document.getElementById("fileInput").click()
              }
            >
              Edit Photo
            </button>

            <input
              id="fileInput"
              type="file"
              hidden
              onChange={handleImageUpload}
            />
          </div>

          <h2 className="user-name">{userName}</h2>

          <div className="stats">
            <div className="stat-box">
              <h3>{subjects.length}</h3>
              <p>Subjects</p>
            </div>

            <div className="stat-box">
              <h3>{topics.length}</h3>
              <p>Topics</p>
            </div>

            <div className="stat-box">
              <h3>{sessions.length}</h3>
              <p>Sessions</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

          {/* GRAPH */}
          <div className="card">
            <h3>Study Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={graphData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#9395d3"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* REVISIONS */}
          <div className="card">
            <h3>Revisions by Subject</h3>
            {revisionList.map((r, i) => (
              <div key={i} className="revision-item">
                <span>{r.subject}</span>
                <span>{r.count}</span>
              </div>
            ))}
          </div>

          {/* ACHIEVEMENTS */}
          <div className="card">
            <h3>Achievements</h3>
            <div className="badges">
              {achievements.length === 0 ? (
                <p>No achievements yet</p>
              ) : (
                achievements.map((a, i) => (
                  <div key={i} className="badge">
                    {a}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;