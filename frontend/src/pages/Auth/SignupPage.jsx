import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState, useRef } from "react";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      localStorage.setItem("token", res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") emailRef.current.focus();
          }}
        />

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
              if (e.key === "Enter") handleSignup();
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

        <button className="auth-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;