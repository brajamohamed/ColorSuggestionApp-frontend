import React from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard bg-secondary vh-100">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
