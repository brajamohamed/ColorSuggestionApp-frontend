import React from "react";
import Logo from "../../Logo/Logo";
import "./HomeNavbar.css";
import { useNavigate } from "react-router-dom";
const HomeNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-0">
      <div className="navbar navbar-expand-lg ">
        <div className="container">
          <div className="navbar-brand">
            <Logo />
          </div>
          <button
            className="navbar-toggler ms-auto"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#whychooseus" className="nav-link">
                  Why choose us
                </a>
              </li>
              <li className="nav-item">
                <a href="#audience" className="nav-link">
                  Who choose us
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="bg-primary border-0 rounded-2 p-1"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
