import { useState, useEffect } from "react";
import CustomDropdown from "../../components/customDropdown";
import SmartPlannerButton from "../../components/SmartPlannerButton"


import Layout from "../../components/Layout";
import TopicCard from "../../components/TopicCard";
import TopicEditModal from "../../components/TopicEditModal";

import {
  getTopics,
  createTopic,
  deleteTopic,
} from "../../services/topicService";

import { getSubjects } from "../../services/subjectService";

import "./TopicsPage.css";

const TopicsPage = () => {
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // ✅ SEPARATED STATES (IMPORTANT FIX)
  const [filterSubject, setFilterSubject] = useState(null);
  const [addSubject, setAddSubject] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTopic, setEditTopic] = useState(null);

  // 📥 FETCH TOPICS
  const fetchTopics = async () => {
    try {
      const res = await getTopics();

      const formatted = res.data.map((t) => ({
        _id: t._id,
        topic: t.name,
        subject: t.subjectId?.name || "No subject",
        subjectId: t.subjectId?._id || t.subjectId,
        risk: t.confidenceLevel || "low",
        revisionCount: t.revisionCount,
        lastStudied: t.lastStudied,
      }));

      setTopics(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // 📥 FETCH SUBJECTS
  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchSubjects();
  }, []);

  // ➕ ADD TOPIC
  const handleAddTopic = async () => {
    if (!topicInput.trim() || !addSubject) {
      alert("Please enter topic and select subject");
      return;
    }

    try {
      await createTopic({
        name: topicInput,
        subjectId: addSubject._id,
      });

      setTopicInput("");
      setAddSubject(null);
      fetchTopics();
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ DELETE
  const handleDeleteClick = (topic) => {
    setSelectedTopic(topic);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTopic(selectedTopic._id);
      setShowDeleteModal(false);
      setSelectedTopic(null);
      fetchTopics();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 FILTER LOGIC
  const filteredTopics = filterSubject
    ? topics.filter((t) => t.subjectId === filterSubject._id)
    : topics;

  const handleEditClick = (topic) => {
    setEditTopic(topic);
    setShowEditModal(true);
  };

  return (
    <Layout>

      {/* HEADER */}
      <div className="topics-header">
        <h1 className="page-title">Topics</h1>

        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <i className="fa-solid fa-filter"></i>
        </button>
      </div>

      {/* FILTER */}
      {showFilter && (
        <div className="filter-dropdown">
          <CustomDropdown
            options={subjects}
            value={filterSubject}
            onChange={setFilterSubject}
            placeholder="Filter by Subject"
          />
        </div>
      )}

      {/* ADD TOPIC */}
      <div className="add-topic-container">

        <input
          type="text"
          placeholder="Enter topic name"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />

        <CustomDropdown
          options={subjects}
          value={addSubject}
          onChange={setAddSubject}
          placeholder="Select Subject"
        />

        <button onClick={handleAddTopic}>
          Add Topic
        </button>

      </div>

      {/* LIST */}
      <div className="card-grid">
        {filteredTopics.map((item) => (
          <div key={item._id} className="topic-wrapper">

            <TopicCard data={item} />

            <div className="topic-actions">
              {/* EDIT */}
              <button className="edit-btn" onClick={() => handleEditClick(item)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              {/* DELETE */}
              <button className="delete-btn" onClick={() => handleDeleteClick(item)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>
              Delete <b>{selectedTopic?.topic}</b>?
            </p>

            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <TopicEditModal topic={editTopic}
        onClose={() => setShowEditModal(false)}
        onUpdate={fetchTopics}
       />
      )
      }
      <SmartPlannerButton />

    </Layout>
  );
};



export default TopicsPage;