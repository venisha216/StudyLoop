import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StudyPlanCard from "../../components/StudyPlanCard";
import TopicCard from "../../components/TopicCard";
import SubjectCard from "../../components/SubjectCard";

import "./Dashboard.css";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [skippedTopics, setSkippedTopics] = useState([]);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setSidebarOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, []);
  const studyPlan = [
    { topic: "Linked Lists", subject: "Data Structures", risk: "High" },
    { topic: "Deadlocks", subject: "Operating Systems", risk: "Medium" },
    { topic: "Normalization", subject: "DBMS", risk: "Low" },
  ];

  const subjects = [
    { name: "Data Structures", topics: 10 },
    { name: "Operating Systems", topics: 8 },
    { name: "DBMS", topics: 6 },
  ];

  const highRiskTopics = [
    { topic: "Graphs", subject: "Data Structures", risk: "High" },
    { topic: "Memory Management", subject: "OS", risk: "High" },
  ];

  return (
    <div className="dashboard-container">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-main">
        <Sidebar open={sidebarOpen} sidebarRef={sidebarRef} />

        <div className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>

          {/* Study Plan */}
          <section className="dashboard-section">
            <h2>Today's Study Plan</h2>

            <div className="card-grid">
              {studyPlan.map((item, index) => (
                <StudyPlanCard 
                key={index}
                data={item}
                onSkip={(topic) => setSkippedTopics([...skippedTopics, topic])}/>
              ))}
            </div>
          </section>

          {/* High Risk Topics */}
          <section className="dashboard-section">
            <h2>High Forgetting Risk</h2>

            <div className="card-grid">
              {highRiskTopics.map((item, index) => (
                <TopicCard key={index} data={item} />
              ))}
            </div>
          </section>

          {/* Subjects */}
          <section className="dashboard-section">
            <h2>Your Subjects</h2>

            <div className="card-grid">
              {subjects.map((item, index) => (
                <SubjectCard key={index} data={item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;