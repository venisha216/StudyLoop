import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import SubjectCard from "../../components/SubjectCard";

import {
  getSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} from "../../services/subjectService";

import "./SubjectsPage.css";

const SubjectsPage = () => {
  const navigate = useNavigate();

  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // ✏️ EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // 📥 FETCH SUBJECTS
  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();

      const formatted = res.data.map((sub) => ({
        _id: sub._id,
        name: sub.name,
        topics: 0,
      }));

      setSubjects(formatted);
    } catch (err) {
      console.error("Error fetching subjects", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // ➕ ADD SUBJECT
  const handleAddSubject = async () => {
    if (!subjectInput.trim()) return;

    try {
      await createSubject(subjectInput);
      setSubjectInput("");
      fetchSubjects();
    } catch (err) {
      console.error("Error adding subject", err);
    }
  };

  // ❌ DELETE FLOW
  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSubject(selectedSubject._id);
      setShowModal(false);
      setSelectedSubject(null);
      fetchSubjects();
    } catch (err) {
      console.error("Error deleting subject", err);
    }
  };

  // ✏️ START EDIT
  const startEdit = (subject) => {
    setEditingId(subject._id);
    setEditValue(subject.name);
  };

  // 💾 SAVE EDIT
  const saveEdit = async (id) => {
    if (!editValue.trim()) return;

    try {
      await updateSubject(id, editValue);
      setEditingId(null);
      fetchSubjects();
    } catch (err) {
      console.error("Error updating subject", err);
    }
  };

  // 📂 OPEN SUBJECT
  const openSubject = (subject) => {
    navigate(`/topics/${subject._id}`);
  };

  return (
    <Layout>
      <h1 className="page-title">Subjects</h1>

      {/* ADD SUBJECT */}
      <div className="add-subject-container">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
        />

        <button onClick={handleAddSubject}>Add Subject</button>
      </div>

      {/* SUBJECT LIST */}
      <div className="card-grid">
        {subjects.map((item) => (
          <div key={item._id} className="subject-wrapper">

            {/* ✏️ EDIT MODE */}
            {editingId === item._id ? (
              <input
                className="edit-input"
                value={editValue}
                autoFocus
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveEdit(item._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(item._id);
                  if (e.key === "Escape") setEditingId(null);
                }}
              />
            ) : (
              <div onClick={() => openSubject(item)}>
                <SubjectCard data={item} />
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="subject-actions">
              
              {/* EDIT */}
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  startEdit(item);
                }}
              >
                <i className="fa-solid fa-pen"></i>
              </button>

              {/* DELETE */}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(item);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>
              Do you want to delete <b>{selectedSubject?.name}</b> subject?
            </p>

            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SubjectsPage;