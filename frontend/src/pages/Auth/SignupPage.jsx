import { Link } from "react-router-dom";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
const navigate = useNavigate();
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

       <button className="auth-btn" onClick={() => navigate("/login")}>
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