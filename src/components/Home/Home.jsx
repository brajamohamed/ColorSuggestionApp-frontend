import React from "react";
import "./Home.css";
import HomeNavbar from "./HomeNavbar/HomeNavbar";
import { FaAnglesRight } from "react-icons/fa6";
import { useFormik } from "formik";
import { contactSchema } from "../../yup/contactSchema";
import { CONTACT_BASE_URL } from "../../api/user.api";
import axios from "axios";
const Home = () => {
  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      await axios
        .post(`${CONTACT_BASE_URL}/newContactRequest`, { values })
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error.response);
    }
    alert("Thank you for contacting us");
    actions.resetForm();
  };
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit,
  });
  return (
    <div>
      <div className="home-navbar-container">
        <HomeNavbar />
      </div>
      <div className="home text-center text-white d-flex flex-column justify-content-center align-items-center">
        <div className="page">
          <h1>Get the most out of your wardrobe</h1>
          <p>Colorful - outfit planner and smart closet organizer</p>
        </div>
        <div className="page container" id="whychooseus">
          <h4>
            Discover a world of style with GetWardrobe, your ultimate makeover
            destination. Whether you're crafting the perfect outfit, searching
            for wardrobe inspiration, or planning your stylebook, we've got you
            covered. Our unique outfit maker tool lets you mix and match to
            create the perfect ensemble, while our outfit planner ensures you're
            always dressed to impress. Step into the future of fashion and let
            GetWardrobe be your personal stylist. Dive in now and redefine your
            style!
          </h4>
        </div>
        <div className="page container audience" id="audience">
          <div className="d-flex me-auto">
            <div>
              <FaAnglesRight />
            </div>
            <div className="text-start ms-5">
              <h5>Busy people</h5>
              <p>Efficent wardrobe in your pocket</p>
            </div>
          </div>
          <div className="d-flex mt-3 me-auto">
            <div>
              <FaAnglesRight />
            </div>
            <div className="text-start ms-5">
              <h5>Fashionables</h5>
              <p>Create new looks,styles and outfits, improve your style</p>
            </div>
          </div>
          <div className="d-flex mt-3 me-auto">
            <div>
              <FaAnglesRight />
            </div>
            <div className="text-start ms-5">
              <h5>Fashion professionals</h5>
              <p>Be with your clients anywhere they need you</p>
            </div>
          </div>
          <div className="d-flex mt-3 me-auto">
            <div>
              <FaAnglesRight />
            </div>
            <div className="text-start ms-5">
              <h5>Moms and dads</h5>
              <p>Curate your spouse's and kid's wardrobes</p>
            </div>
          </div>
        </div>
        <div className="page container contact" id="contact">
          <form action="" className="d-flex flex-column gap-4">
            <h3>Send us a message, we wil contact you.</h3>
            <div className="input-group">
              <label htmlFor="name" className="input-group-text">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                className={`${errors.name && touched.name && "contact-error"}`}
              >
                {errors.name && touched.name && errors.name}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email" className="input-group-text">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                className={`${
                  errors.email && touched.email && "contact-error"
                }`}
              >
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="mobile" className="input-group-text">
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                className={`${
                  errors.mobile && touched.mobile && "contact-error"
                }`}
              >
                {errors.mobile && touched.mobile && errors.mobile}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="message" className="input-group-text">
                Message
              </label>
              <textarea
                type="text"
                className="form-control"
                id="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                className={`${
                  errors.message && touched.message && "contact-message-error"
                }`}
              >
                {errors.message && touched.message && errors.message}
              </div>
            </div>
            <button
              type="submit"
              className="bg-success border-0 rounded-2 p-2 text-white"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="spinner-grow spinner-grow-sm"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
