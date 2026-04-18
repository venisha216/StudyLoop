import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState, useRef } from "react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") passwordRef.current.focus();
          }}
        />

        <div className="password-wrapper">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;