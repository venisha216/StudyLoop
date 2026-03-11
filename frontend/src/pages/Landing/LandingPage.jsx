import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {

  return (
    <div className="landing-container">

      {/* Navbar */}

      <nav className="landing-navbar">

        <h2 className="landing-logo">StudyLoop</h2>

        <div className="landing-links">

          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="hero">

        <h1>Never Forget What You Study</h1>

        <p>
          StudyLoop helps you track topics, monitor confidence levels,
          and revise at the perfect time using the forgetting curve.
        </p>

        <Link to="/signup" className="hero-btn">
          Start Studying
        </Link>

      </section>


      {/* Features */}

      <section className="features">

        <div className="feature-card">
          <h3>📚 Topic Tracking</h3>
          <p>Organize subjects and topics in one place.</p>
        </div>

        <div className="feature-card">
          <h3>🧠 Confidence Monitoring</h3>
          <p>Record how confident you are after studying.</p>
        </div>

        <div className="feature-card">
          <h3>⏳ Smart Revisions</h3>
          <p>Revise topics at the right time using the forgetting curve.</p>
        </div>

      </section>


      {/* Call to Action */}

      <section className="cta">

        <h2>Start Building Your Perfect Study System</h2>

        <Link to="/signup" className="cta-btn">
          Create Free Account
        </Link>

      </section>


      {/* Footer */}

      <footer className="landing-footer">

        <p>© 2026 StudyLoop</p>

      </footer>

    </div>
  );
};

export default LandingPage;