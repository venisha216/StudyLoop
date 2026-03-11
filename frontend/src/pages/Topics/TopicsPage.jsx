import { useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import TopicCard from "../../components/TopicCard";

import "./TopicsPage.css";

const TopicsPage = () => {

  const { subjectName } = useParams();

  const [topicInput, setTopicInput] = useState("");

  const [topics, setTopics] = useState([
    { topic: "Linked Lists", subject: subjectName || "General", risk: "Low" },
    { topic: "Trees", subject: subjectName || "General", risk: "Low" }
  ]);

  const handleAddTopic = () => {

    if (!topicInput.trim()) return;

    const newTopic = {
      topic: topicInput,
      subject: subjectName || "General",
      risk: "Low"
    };

    setTopics([...topics, newTopic]);
    setTopicInput("");
  };

  return (
    <Layout>

      <h1 className="page-title">
        {subjectName ? `Topics — ${subjectName}` : "All Topics"}
      </h1>

      <div className="add-topic-container">

        <input
          type="text"
          placeholder="Enter topic name"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />

        <button onClick={handleAddTopic}>
          Add Topic
        </button>

      </div>

      <div className="card-grid">

        {topics.map((item, index) => (
          <TopicCard key={index} data={item} />
        ))}

      </div>

    </Layout>
  );
};

export default TopicsPage;