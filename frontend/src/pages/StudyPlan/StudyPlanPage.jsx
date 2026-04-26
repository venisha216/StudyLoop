import { useState } from "react";
import { useLocation } from "react-router-dom";
import StudyPlanCard from "../../components/StudyPlanCard";
import Layout from "../../components/Layout";
import "./StudyPlanPage.css";

export default function StudyPlanPage() {
  const location = useLocation();

  // ✅ Restore subject after redirect
  const [selectedSubject, setSelectedSubject] = useState(
    location.state?.selectedSubject || null
  );

  const allPlans =
    JSON.parse(localStorage.getItem("studyPlans")) || {};

  const subjects = Object.keys(allPlans);

  // 🔥 FORMAT PLAN
  const formatWeeklyPlan = (plan) => {
    return plan.map((weekItem) => {
      const parts = weekItem.content
        .split("+")
        .map((p) => p.trim());

      const topics = parts.map((p) => {
        if (p.startsWith("Revise")) {
          return {
            topic: p.replace("Revise", "").trim(),
            isRevision: true,
            risk: "Low",
          };
        }
        return {
          topic: p,
          isRevision: false,
          risk: "High",
        };
      });

      return {
        week: weekItem.week,
        topics,
      };
    });
  };

  const handleSkip = (data) => {
    console.log("Skipped:", data);
  };

  // 🔥 SUBJECT LIST VIEW
  if (!selectedSubject) {
    return (
      <Layout>
        <div className="study-container">
          <h1>📘 Study Plans</h1>

          <div className="subject-list">
            {subjects.map((sub) => (
              <div
                key={sub}
                className="subject-card"
                onClick={() => setSelectedSubject(sub)}
              >
                <h3>{sub}</h3>
                <p>Click to view plan</p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // 🔥 DETAILED PLAN VIEW
  const plan = allPlans[selectedSubject];
  const weeklyPlan = formatWeeklyPlan(plan);

  return (
    <Layout>
      <div className="study-container">
        <button
          className="back-btn"
          onClick={() => setSelectedSubject(null)}
        >
          ← Back
        </button>

        <h1>📘 {selectedSubject} Plan</h1>

        {weeklyPlan.map((week) => (
          <div key={week.week} className="week-block">
            <div className="week-header">
              <h2>Week {week.week}</h2>
            </div>

            <div className="card-container">
              {week.topics.map((t, index) => (
                <div
                  key={index}
                  className={`topic-wrapper ${
                    t.isRevision ? "revision" : ""
                  }`}
                >
                  {/* 🔁 REVISION TAG */}
                  {t.isRevision && (
                    <span className="revision-tag">
                      🔁 Revision
                    </span>
                  )}

                  <StudyPlanCard
                    data={{
                      topic: t.topic,
                      subject: selectedSubject,
                      risk: t.risk,
                      selectedSubject: selectedSubject, // ✅ IMPORTANT
                    }}
                    onSkip={handleSkip}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}