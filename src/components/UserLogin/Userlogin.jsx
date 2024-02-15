import React, { useState } from "react";
import "./Userlogin.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { loginSchema } from "../../yup/loginSchema";
import { USER_BASE_URL } from "../../api/user.api";
const Userlogin = () => {
  // ON SUBMIT FUNCTION
  const onSubmit = async (values, actions) => {
    console.log(values);
    await axios
      .put(`${USER_BASE_URL}/login`, values)
      .then((res) => console.log(res.data.jwt))
      .catch((error) => console.log(error));
    // actions.resetForm();
  };
  //   FORMIK
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <div className="login-container  vh-100 bg-primary d-flex justify-content-center align-items-center">
      <div className="form-container d-flex flex-column justify-content-center align-items-center rounded-3">
        <h1 className="text-primary fw-bold mt-3">Colorful</h1>
        <form
          action=""
          className="d-flex flex-column jusfify-content-center align-items-center gap-4 p- bg-white mx-5 my-3"
        >
          {/* EMAIL */}
          <div className="input-group">
            <label htmlFor="username" className="input-group-text">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>
          {/* PASSWORD */}
          <div className="input-group">
            <label htmlFor="password" className="input-group-text">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </div>
          {/* SUBMIT */}
          <button
            type="submit"
            className="submit px-4 py-2 rounded bg-success text-white fw-bold border-0"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span className="spinner-grow spinner-grow-sm"></span>
            ) : (
              "Login"
            )}
          </button>
          <div className="d-flex gap-3 links">
            {/*LINK TO FORGOT PASSWORD */}
            <div>
              <Link to="/forgotPassword">
                <small>Forgot Password?</small>
              </Link>
            </div>
            {/* LINK TO NEW USER REGISTRATION */}
            <div>
              <Link to="/register">
                <small>Sign up for Colorful</small>{" "}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userlogin;
