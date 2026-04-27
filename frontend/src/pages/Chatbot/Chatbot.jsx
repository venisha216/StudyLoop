import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "Hi! Ask anything or upload a document 📄",
          },
        ];
  });

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessagesForAPI = () => {
    return messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));
  };

  const handleSubmit = async () => {
    if (!input && !file) {
      toast.error("Provide text or file");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error("File must be less than 10MB");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "messages",
          JSON.stringify(formatMessagesForAPI())
        );

        response = await axios.post(
          "http://localhost:5000/api/ai/analyze",
          formData
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/ai/analyze",
          {
            text: input,
            messages: formatMessagesForAPI(),
          }
        );
      }

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input || `📄 ${file.name}` },
        { sender: "bot", text: response.data.result },
      ]);

      setInput("");
      setFile(null);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="chatbot-container">

        <h2 className="chatbot-title">AI Study Assistant</h2>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.text.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          ))}

          {loading && (
            <div className="message bot">Thinking...</div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="upload-section">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
          />
          <button onClick={handleSubmit}>
            Send
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default Chatbot;