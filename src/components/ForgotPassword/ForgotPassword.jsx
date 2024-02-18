import React, { useState } from "react";
import "./ForgotPassword.css";
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../../yup/forgotPasswordSchema";
import axios from "axios";
import { USER_BASE_URL } from "../../api/user.api";
import Logo from "../Logo/Logo";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const onSubmit = async (values, actions) => {
    console.log(values);
    await axios
      .put(`${USER_BASE_URL}/forgotPassword`, values)
      .then((res) => {
        setSuccess(true);
        // alert("Email has been sent");
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    // actions.resetForm();
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <div className="forgotContainer d-flex justify-content-center align-items-center vh-100 bg-secondary">
      <div className="forgotFormContainer bg-white rounded">
        <div className="text-center">
          <Logo size={"lg"} />
        </div>
        {success ? (
          <div>
            <p className="text-primary fw-bold text-center resetEmailSuccess p-3">
              Email has been sent to your registered email address. Click on the
              reset link to reset your password.
            </p>
          </div>
        ) : (
          <div>
            <div className="forgotTop d-flex flex-column">
              <p className="ms-3">
                Enter your registered email address. <br />
                You will receive a email with a link to reset your password.
              </p>
            </div>
            <form
              action=""
              className="d-flex flex-column align-items-center gap-4 p-3"
            >
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control ${
                    errors.email && touched.email && "forgotEmail-input-error"
                  }`}
                  id="email"
                  placeholder="Enter your registered Email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <small
                  className={`${
                    errors.email && touched.email && "forgotEmail-error"
                  }`}
                >
                  {errors.email && touched.email && errors.email}
                </small>
              </div>
              <div className="forgotButton d-flex gap-3">
                <button
                  type="submit"
                  className="bg-success rounded-2 text-white p-2 border-0 "
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <span className="spinner-grow spinner-grow-sm"></span>
                  ) : (
                    "Send reset link"
                  )}
                </button>
                <button
                  type="cancel"
                  disabled={isSubmitting}
                  className="bg-danger rounded-2 text-white p-2 border-0 "
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
