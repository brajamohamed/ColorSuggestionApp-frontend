import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login]);

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
