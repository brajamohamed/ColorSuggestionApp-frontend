import React, { useEffect } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wardrobe from "./Wardrobe/Wardrobe";
const Dashboard = () => {
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login]);

  return (
    <div className="">
      <div className="account-navbar-container">
        <Navbar />
      </div>
      <div className="dashboard bg-secondary vh-100">
        <div className="wardrobe-container">
          <div className="wardrobe bg-primary">
            <Wardrobe />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
