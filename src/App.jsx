import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Userlogin from "./components/UserLogin/Userlogin";
import Registration from "./components/UserRegistration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import { useEffect } from "react";
import axios from "axios";
import { USER_BASE_URL } from "./api/user.api";
import { setLogin } from "./rtk-store/slices/loginSlice";
import Wardrobe from "./components/Dashboard/Wardrobe/Wardrobe";
function App() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log("App logged IN:", login);
  useEffect(() => {
    console.log("app loaded");
    const token = localStorage.getItem("token");
    const findUser = async () => {
      try {
        const response = await axios.get(`${USER_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data;
        if (user) {
          dispatch(setLogin(true));
        }
      } catch (error) {
        console.error("Error fetching user data");
      }
    };
    if (token) {
      findUser();
    } else {
      dispatch(setLogin(false));
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={login ? <Dashboard /> : <Home />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
      </Routes>
    </div>
  );
}

export default App;
