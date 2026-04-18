import { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Upload a document and I’ll summarize it and create a quiz for you 📄✨" }
  ]);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    // TEMP MOCK RESPONSE (replace with backend later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: `Uploaded: ${file.name}` },
        { sender: "bot", text: "📌 Summary:\n- Point 1\n- Point 2\n- Point 3" },
        { sender: "bot", text: "🧠 Quiz:\n1. Question?\nA) Option\nB) Option\nC) Option\nD) Option" }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">AI Study Assistant</h2>

      {/* Chat Messages */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}

        {loading && <div className="message bot">Thinking...</div>}
      </div>

      {/* File Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          accept=".doc,.docx"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload & Analyze</button>
      </div>

      {/* Input box (future use) */}
      <div className="chat-input">
        <input type="text" placeholder="Ask something..." disabled />
        <button disabled>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;