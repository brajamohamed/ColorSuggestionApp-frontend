import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Userlogin from "./components/UserLogin/Userlogin";
import Registration from "./components/UserRegistration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Userlogin />} />
      </Routes>
    </div>
  );
}

export default App;
