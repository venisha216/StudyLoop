import Layout from "../../components/Layout";
import StudyPlanCard from "../../components/StudyPlanCard";

const StudyPlanPage = () => {

  const studyPlan = [
    { topic: "Linked Lists", subject: "Data Structures", risk: "High" },
    { topic: "Deadlocks", subject: "Operating Systems", risk: "Medium" },
    { topic: "Normalization", subject: "DBMS", risk: "Low" }
  ];

  return (
    <Layout>

      <h1 className="page-title">Study Plan</h1>

      <div className="card-grid">

        {studyPlan.map((item, index) => (
          <StudyPlanCard key={index} data={item} />
        ))}

      </div>

    </Layout>
  );
};

export default StudyPlanPage;