import { useSelector } from "react-redux";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Userlogin from "./components/UserLogin/Userlogin";
import Registration from "./components/UserRegistration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
function App() {
  const login = useSelector((state) => state.login);
  console.log("App logged IN:", login);
  return (
    <div>
      <Routes>
        <Route path="/" element={login ? <Dashboard /> : <Home />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
