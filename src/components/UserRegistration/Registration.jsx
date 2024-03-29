import React, { useEffect } from "react";
import "./Registration.css";
import { useFormik } from "formik";
import { registraionSchema } from "../../yup/registraionSchema";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_BASE_URL } from "../../api/user.api";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const { cpassword, ...data } = values;
    console.log(data);
    await axios
      .post(`${USER_BASE_URL}/register`, data)
      .then((response) => {
        console.log(response);
        toast.success(
          `Hello ${response.data.newUser.name}..Welcome to the Colorful Family`
        );
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.log(error.response.data);
      });
    actions.resetForm();
  };

  const fetchData = async () => {
    try {
      const placeData = async () => {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        return response.data.data;
      };

      const countries = await placeData();
      setCountryList(countries);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      gender: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      country: "",
      city: "",
      password: "",
      cpassword: "",
    },
    validationSchema: registraionSchema,
    onSubmit,
  });
  return (
    <div className="registraion-container d-flex flex-column justify-content-center align-items-center vh-100">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
      />
      <div className="registration-logo">
        <Logo size={"lg"} />
      </div>
      <div className="form-container rounded-3">
        <div className="text-center border-bottom mt-3">
          <h4>Create a new account</h4>
          <p>It's quick and easy.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="form d-flex flex-column align-items-center gap-4 p-3 mt-2 "
        >
          <div className="d-flex gap-3">
            {/* NAME */}
            <div className="input-group">
              <input
                className={`form-control ${
                  errors.name && touched.name ? "input-error" : ""
                }`}
                type="text"
                id="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <small className="error-message">{errors.name}</small>
              )}
            </div>

            {/* GENDER */}
            <div className="input-group">
              <select
                className={`form-select ${
                  errors.gender && touched.gender ? "input-error" : ""
                }`}
                id="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
              >
                <option disabled value="">
                  Select your Gender
                </option>
                <option value="female">Female</option>
              </select>
              {errors.gender && touched.gender && (
                <small className="error-message">{errors.gender}</small>
              )}
            </div>
          </div>
          {/* EMAIL */}
          <div className="input-group">
            <input
              className={`form-control ${
                errors.email && touched.email ? "input-error" : ""
              }`}
              id="email"
              type="email"
              placeholder="Your Email Id"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <small className="error-message">{errors.email}</small>
            )}
          </div>
          {/* PHONE */}
          <div className="input-group">
            <input
              className={`form-control ${
                errors.phone && touched.phone ? "input-error" : ""
              }`}
              id="phone"
              type="number"
              placeholder="Your Mobile number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone && (
              <small className="error-message">{errors.phone}</small>
            )}
          </div>
          {/* DATE OF BIRTH */}
          <div className="input-group">
            <label
              htmlFor="dateOfBirth"
              className="input-group-text registration-form-label"
            >
              Date of birth
            </label>
            <input
              className={`form-control ${
                errors.dateOfBirth && touched.dateOfBirth ? "input-error" : ""
              }`}
              id="dateOfBirth"
              type="date"
              placeholder="Your Date of Birth"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateOfBirth}
            />
            {errors.dateOfBirth && touched.dateOfBirth && (
              <small className="error-message">{errors.dateOfBirth}</small>
            )}
          </div>
          <div className="d-flex gap-3">
            {/* COUNTRY */}
            <div className="input-group">
              <select
                className={`form-select ${
                  errors.country && touched.country ? "input-error" : ""
                }`}
                id="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              >
                <option value="" disabled>
                  Select your Country
                </option>
                {countryList.map((country, index) => (
                  <option key={index} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.country && touched.country && (
                <small className="error-message">{errors.country}</small>
              )}
            </div>
            {/* CITY */}
            <div className="input-group">
              <select
                className={`form-select ${
                  errors.city && touched.city ? "input-error" : ""
                }`}
                id="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              >
                <option value="" disabled>
                  Select your City
                </option>
                {values.country &&
                  countryList.map((data) => {
                    if (data.country === values.country) {
                      const cities = data.cities;
                      return cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </select>
              {errors.city && touched.city && (
                <small className="error-message">{errors.city}</small>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            {/* PASSWORD */}
            <div className="input-group">
              <input
                className={`form-control ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
                type="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <small className="error-message">{errors.password}</small>
              )}
            </div>
            {/* CONFIRM PASSWORD */}
            <div className="input-group">
              <input
                className={`form-control ${
                  errors.cpassword && touched.cpassword ? "input-error" : ""
                }`}
                type="password"
                id="cpassword"
                placeholder="Confirm your password"
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cpassword && touched.cpassword && (
                <small className="error-message">{errors.cpassword}</small>
              )}
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit rounded bg-success text-white border-0 py-2 px-5 mt-3 fw-bold ${
              isSubmitting && "disabled"
            }`}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
              ></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="text-center mb-3 login-link">
          <Link to="/login">Already have a Account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
