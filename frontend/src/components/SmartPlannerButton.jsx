import { useState } from "react";
import axios from "axios";
import "./SmartPlanner.css";

export default function SmartPlannerButton() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subjectName: "",
    duration: 6,
    examPrep: "no",
    examDate: "",
    examType: "",
    totalMarks: "",
    syllabus: null,
    notes: null,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("subjectName", form.subjectName);
      data.append("duration", form.duration);
      data.append("examType", form.examType);
      data.append("examDate", form.examDate);
      data.append("totalMarks", form.totalMarks);

      if (form.syllabus) data.append("syllabus", form.syllabus);
      if (form.notes) data.append("notes", form.notes);

      // await axios.post(
      //   "http://localhost:5000/api/planner/generate-plan",
      //   data,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      const res = await axios.post(
  "http://localhost:5000/api/planner/generate-plan",
  data,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

// just log + store
console.log("GENERATED PLAN:", res.data);

// store in localStorage (safe, no UI break)

// store in localStorage
const existingPlans =
  JSON.parse(localStorage.getItem("studyPlans")) || {};

const planData = res.data.studyPlan.plan;

existingPlans[form.subjectName] = planData;

localStorage.setItem(
  "studyPlans",
  JSON.stringify(existingPlans)
);

console.log("Saved:", form.subjectName, planData);

alert("Study Plan Generated Successfully!");
setShow(false);
      alert("Study Plan Generated Successfully!");
      setShow(false);
    } catch (err) {
      console.error(err);
      alert("Error generating plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button className="smart-btn" onClick={() => setShow(true)}>
        Smart Study Plan Generator
      </button>

      {/* MODAL */}
      {show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Smart Study Plan</h2>

            <input
              placeholder="Subject Name"
              onChange={(e) =>
                setForm({ ...form, subjectName: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Duration (1–6 months)"
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setForm({ ...form, examPrep: e.target.value })
              }
            >
              <option value="no">Preparing for exam?</option>
              <option value="yes">Yes</option>
            </select>

            {form.examPrep === "yes" && (
              <>
                <input
                  type="date"
                  onChange={(e) =>
                    setForm({ ...form, examDate: e.target.value })
                  }
                />

                <select
                  onChange={(e) =>
                    setForm({ ...form, examType: e.target.value })
                  }
                >
                  <option value="">Exam Type</option>
                  <option value="objective">Objective</option>
                  <option value="subjective">Subjective</option>
                  <option value="combined">Combined</option>
                </select>

                <input
                  placeholder="Total Marks (optional)"
                  onChange={(e) =>
                    setForm({ ...form, totalMarks: e.target.value })
                  }
                />
              </>
            )}

            <label>Syllabus PDF</label>
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, syllabus: e.target.files[0] })
              }
            />

            <label>Notes (optional)</label>
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, notes: e.target.files[0] })
              }
            />

            <div className="modal-actions">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="generate-btn"
              >
                {loading ? "Generating..." : "Generate Plan"}
              </button>

              <button
                onClick={() => setShow(false)}
                className="close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}