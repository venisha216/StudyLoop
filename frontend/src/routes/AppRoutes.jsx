import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import SubjectsPage from "../pages/Subjects/SubjectsPage";
import TopicsPage from "../pages/Topics/TopicsPage";
import StudySessionPage from "../pages/StudySession/StudySessionPage";
import StudyPlanPage from "../pages/StudyPlan/StudyPlanPage";
import TopicDetailsPage from "../pages/TopicDetails/TopicDetailsPage";
import ProfilePage from "../pages/Profile/ProfilePage";

function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />
       <Route path="/study-plan" element={<StudyPlanPage />} />
       <Route path="/profile" element={<ProfilePage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/topics/:subjectName" element={<TopicsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/study-session" element={<StudySessionPage />} />
        <Route path="/study-plan" element={<StudyPlanPage />} />
        <Route path="/topic-details" element={<TopicDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;