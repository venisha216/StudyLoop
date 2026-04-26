import { useState } from "react";
import { updateTopic } from "../services/topicService";
import CustomDropdown from "./customDropdown";

import "./TopicEditModal.css";

const confidenceOptions = [
  { name: "😟 Low", value: "Low" },
  { name: "😐 Medium", value: "Medium" },
  { name: "😊 High", value: "High" },
];

const TopicEditModal = ({ topic, onClose, onUpdate }) => {
  const [name, setName] = useState(topic.topic);

  const [confidence, setConfidence] = useState(
    confidenceOptions.find((c) => c.value === topic.risk) ||
      confidenceOptions[0]
  );

  const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0]; //  FIX
};

const [lastStudied, setLastStudied] = useState(
  formatDate(topic.lastStudied)
);
  const [revisionCount, setRevisionCount] = useState(
    topic.revisionCount || 0
  );

  const [loading, setLoading] = useState(false);
 const handleUpdate = async () => {
  try {
    setLoading(true);

    const payload = {
      name: name.trim(),
      revisionCount: Number(revisionCount),
      confidenceLevel: confidence?.value?.toLowerCase(),
    };

    if (lastStudied) {
      payload.lastStudied = new Date(lastStudied).toISOString();
    }

    console.log("FINAL PAYLOAD:", payload);

    const res = await updateTopic(topic._id, payload);

    onUpdate(res.data);   //  FIXED
    onClose();

  } catch (err) {
    console.error("UPDATE ERROR:", err.response?.data || err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h3>Edit Topic</h3>

        {/* NAME */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CONFIDENCE (CUSTOM DROPDOWN) */}
        <div className="field">
          <label>Confidence</label>

          <CustomDropdown
            options={confidenceOptions}
            value={confidence}
            onChange={setConfidence}
            placeholder="Select Confidence"
          />
        </div>

        {/* LAST STUDIED */}
        <div className="field">
          <label>Last Studied</label>

          <input
            type="date"
            value={lastStudied}
            onChange={(e) => setLastStudied(e.target.value)}
          />
        </div>

        {/* REVISION COUNT */}
        <div className="field">
          <label>Revisions</label>

          <div className="revision-box">

            <span>{revisionCount}</span>

            <button
              onClick={() => setRevisionCount((prev) => prev + 1)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">

          <button
            className="confirm-btn"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
};

export default TopicEditModal;