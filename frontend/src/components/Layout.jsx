import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="dashboard-container">

      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-main">

        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="dashboard-content">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Layout;