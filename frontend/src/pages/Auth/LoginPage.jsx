import { Link } from "react-router-dom";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        
        <button className="auth-btn" onClick={() => navigate("/dashboard")}>
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