import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import pic from "../../../assets/licensed-image.jpeg";
const Navbar = () => {
  return (
    <div className="container-fluid p-0">
      <div className="navbar navbar-expand-md bg-white">
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
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  id="dropdown_1"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Account
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="dropdown-item">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="dropdown-item">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
