import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../yup/resetPasswordSchema";
import { USER_BASE_URL } from "../../api/user.api";
const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  // VERIFY THE TOKEN IS VALID OR NOT
  const verified = async () => {
    axios
      .put(`${USER_BASE_URL}/verifyResetPwdToken`, {
        token,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        setIsVerified(true);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setError(err.response.data.error);
        setIsVerified(false);
      });
  };
  useEffect(() => {
    verified();
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const { password } = values;
      console.log("i am submitting");
      await axios
        .put(`${USER_BASE_URL}/resetPassword/${token}`, {
          password,
        })
        .then((res) => {
          console.log(res.data);
          alert("Password changed successfully");
        })
        .catch((error) => console.log(error.response));
      navigate("/login");
    } catch (error) {}
  };
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit,
  });
  return (
    <div className="resetCotainer bg-secondary d-flex vh-100 justify-content-center align-items-center">
      {isVerified ? (
        <div className="resetFormContainer bg-white rounded p-3">
          <h2>{`Hi, ${user}`}</h2>
          <p>Set a new password</p>
          <form action="" className="d-flex flex-column gap-4">
            <div className="input-group">
              <label htmlFor="password" className="input-group-text">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password && touched.password && "input-error"
                }`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <small
                className={`${errors.password && touched.password && "error"}`}
              >
                {errors.password}
              </small>
            </div>
            <div className="input-group">
              <label htmlFor="cpassword" className="input-group-text">
                Reconfirm
              </label>
              <input
                type="password"
                id="cpassword"
                className={`form-control ${
                  errors.password && touched.password && "input-error"
                }`}
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <small
                className={`${
                  errors.cpassword && touched.cpassword && "error"
                }`}
              >
                {errors.cpassword}
              </small>
            </div>
            {/* BUTTON */}
            <button
              type="button"
              className="bg-success rounded border-0 p-2 text-white"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="spinner-grow spinner-grow-sm"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="error">
          <h2>{`${error}`}</h2>
        </div>
      )}
    </div>
  );
};
export default ResetPassword;
