import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import StudyPlanCard from "../../components/StudyPlanCard";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import ProgressChart from "../../components/ProgressChart";

export default function DashboardPage() {
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const topicsRes = await axios.get(
          "http://localhost:5000/api/topics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const subjectsRes = await axios.get(
          "http://localhost:5000/api/subjects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const topicsData =
          topicsRes.data.data ||
          topicsRes.data.topics ||
          topicsRes.data ||
          [];

        const subjectsData =
          subjectsRes.data.data ||
          subjectsRes.data.subjects ||
          subjectsRes.data ||
          [];

        setTopics(topicsData);
        setSubjects(subjectsData);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const today = new Date();

  const todaysTopics = topics.filter(
    (t) =>
      t.nextReviewDate &&
      new Date(t.nextReviewDate) <= today
  );

  const highRiskTopics = topics.filter(
    (t) => t.confidenceLevel === "low"
  );

  const formatCard = (t) => ({
    topic: t.name,
    subject: t.subjectId?.name || "Unknown",
    risk:
      t.confidenceLevel === "low"
        ? "High"
        : t.confidenceLevel === "medium"
        ? "Medium"
        : "Low",
  });

  const handleSkip = (data) => {
    console.log("Skipped:", data);
  };

  return (
    <Layout>
      <div className="dashboard-container">

        <div className="dashboard-main">
          <div className="dashboard-content">

            <h1 className="dashboard-title">Dashboard</h1>

            {/* 🔥 ROW: CHART + TODAY */}
            <div className="dashboard-row">

              {/* 📊 LEFT */}
              <div className="dashboard-col chart-col">
                <h2> Your Progress</h2>
                <div className="chart-container">
                  <ProgressChart topics={topics} />
                </div>
              </div>

              {/* 📅 RIGHT */}
              <div className="dashboard-col">
                <h2>Today's Study Plan</h2>

                <div className="card-grid">
                  {todaysTopics.length === 0 ? (
                    <p>No topics scheduled for today 🎉</p>
                  ) : (
                    todaysTopics.map((t) => (
                      <StudyPlanCard
                        key={t._id}
                        data={formatCard(t)}
                        onSkip={handleSkip}
                      />
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* 🔥 HIGH RISK */}
            <div className="dashboard-section">
              <h2>High Forgetting Risk</h2>

              <div className="card-grid">
                {highRiskTopics.length === 0 ? (
                  <p>No high-risk topics 👍</p>
                ) : (
                  highRiskTopics.map((t) => (
                    <StudyPlanCard
                      key={t._id}
                      data={formatCard(t)}
                      onSkip={handleSkip}
                    />
                  ))
                )}
              </div>
            </div>

            {/* 📘 SUBJECTS */}
            <div className="dashboard-section">
              <h2>Your Subjects</h2>

              <div className="card-grid">
                {subjects.map((s) => (
                  <div
                    key={s._id}
                    className="subject-card"
                    onClick={() => navigate("/subjects")}
                  >
                    <h3>{s.name}</h3>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}