import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <div className="navbar-brand">
            <h5 className="text-light">Colors</h5>
          </div>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="user-profile">
            <img src="" alt="user pic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
