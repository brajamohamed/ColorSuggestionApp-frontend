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
const Dashboard = () => {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      console.log("i have to navigate to login");
      navigate("/login");
    }
  }, [login]);
  const token = localStorage.getItem("token");
  console.log("token got from local storage:", token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${USER_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
