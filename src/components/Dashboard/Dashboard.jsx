import React, { useEffect } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Wardrobe from "./Wardrobe/Wardrobe";
import { USER_BASE_URL } from "../../api/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../rtk-store/slices/userSlice";
import DashHome from "./DashHome/DashHome";
const Dashboard = () => {
  const dispatch = useDispatch();
  // const login = useSelector((state) => state.login);
  // const navigate = useNavigate();
  // IF NOT LOGGED IN NAVIGATE TO LOGIN
  // useEffect(() => {
  //   if (!login) {
  //     console.log("i have to navigate to login");
  //     navigate("/login");
  //   }
  // }, [login]);

  // GET USER DETAILS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${USER_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        dispatch(setUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="account-navbar-container">
        <Navbar />
      </div>
      <div className="dashboard">
        <div className="dashboard-home d-flex justify-content-center" id="home">
          <DashHome />
        </div>
        <div
          className="dashboard-wardrobe d-flex justify-content-center align-items-center"
          id="wardrobe"
        >
          <Wardrobe />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
