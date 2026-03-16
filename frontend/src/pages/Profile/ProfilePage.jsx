import Layout from "../../components/Layout";
import "./ProfilePage.css";

const ProfilePage = () => {

  return (
    <Layout>

      <h1 className="page-title">Profile</h1>

      <div className="profile-card">

        <p><strong>Name:</strong> Student</p>

        <p><strong>Subjects:</strong> 3</p>

        <p><strong>Topics Studied:</strong> 25</p>

        <p><strong>Total Revisions:</strong> 10</p>

        <button className="logout-btn">
          Logout
        </button>

      </div>

    </Layout>
  );
};

export default ProfilePage;