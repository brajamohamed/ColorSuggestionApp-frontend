import React from "react";
import "./Logo.css";
import { useNavigate } from "react-router-dom";
const Logo = ({ size }) => {
  const navigate = useNavigate();
  return (
    <h1 className={`logo logo-${size}`} onClick={() => navigate("/")}>
      Colorful
    </h1>
  );
};

export default Logo;
