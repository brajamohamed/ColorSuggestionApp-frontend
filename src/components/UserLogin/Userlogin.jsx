import React, { useEffect } from "react";
import "./Userlogin.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../yup/loginSchema";
import { USER_BASE_URL } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../rtk-store/slices/loginSlice";
import Logo from "../Logo/Logo";
const Userlogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.login);

  useEffect(() => {
    login && navigate("/account");
  }, [login]);
  // ON SUBMIT FUNCTION
  const onSubmit = async (values, actions) => {
    console.log(values);
    await axios
      .put(`${USER_BASE_URL}/login`, values)
      .then((res) => {
        const token = res.data.jwt;
        console.log("Login successfull");
        localStorage.setItem("token", token);
        dispatch(setLogin(true));
      })
      .catch((error) => {
        alert("Invalid credentials");
        console.log(error);
      });
    actions.resetForm();
  };

  //   FORMIK
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <div className="login-container vh-100 d-flex justify-content-center align-items-center">
      <div className="login-form-container d-flex flex-column justify-content-center align-items-center rounded-3 p-3">
        <div>
          <Logo size={"md"} />
        </div>
        <form
          action=""
          className="d-flex flex-column jusfify-content-center align-items-center gap-4 bg-white my-3"
        >
          {/* EMAIL */}
          <div className="input-group">
            <label
              htmlFor="username"
              className="input-group-text login-form-label"
            >
              Email
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.email && touched.email && "error-input"
              }`}
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <small
              className={`${errors.email && touched.email && "login-error"}`}
            >
              {errors.email && touched.email && errors?.email}
            </small>
          </div>
          {/* PASSWORD */}
          <div className="input-group">
            <label
              htmlFor="password"
              className="input-group-text login-form-label"
            >
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password && touched.password && "error-input"
              }`}
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <small
              className={`${
                errors.password && touched.password && "login-error"
              }`}
            >
              {errors.password && touched.password && errors.password}
            </small>
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
