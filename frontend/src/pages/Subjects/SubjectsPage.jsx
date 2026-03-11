import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import SubjectCard from "../../components/SubjectCard";

import "./SubjectsPage.css";

const SubjectsPage = () => {

  const navigate = useNavigate();

  const [subjectInput, setSubjectInput] = useState("");

  const [subjects, setSubjects] = useState([
    { name: "Data Structures", topics: 10 },
    { name: "Operating Systems", topics: 8 }
  ]);

  const handleAddSubject = () => {

    if (!subjectInput.trim()) return;

    const newSubject = {
      name: subjectInput,
      topics: 0
    };

    setSubjects([...subjects, newSubject]);
    setSubjectInput("");
  };

  const openSubject = (subject) => {
    navigate(`/topics/${subject.name}`);
  };

  return (
    <Layout>

      <h1 className="page-title">Subjects</h1>

      <div className="add-subject-container">

        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
        />

        <button onClick={handleAddSubject}>
          Add Subject
        </button>

      </div>

      <div className="card-grid">

        {subjects.map((item, index) => (
          <div
            key={index}
            onClick={() => openSubject(item)}
          >
            <SubjectCard data={item} />
          </div>
        ))}

      </div>

    </Layout>
  );
};

export default SubjectsPage;