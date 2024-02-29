import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Wardrobe.css";
import { USER_BASE_URL } from "../../../api/user.api";
import { ChromePicker, SketchPicker } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../rtk-store/slices/userSlice";
import { useFormik } from "formik";
import { wardrobeSchema } from "../../../yup/wardrobeSchema";
const Wardrobe = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const [wardrobe, setWardrobe] = useState(user.wardrobe);
  const [color, setColor] = useState("");
  useEffect(() => {
    setWardrobe(user.wardrobe);
  }, [user.wardrobe]);

  const onSubmit = async (values, actions) => {
    if (!color) {
      return toast.error("Select a color");
    }
    const newItem = { color, ...values };
    console.log("new item", newItem);
    try {
      await axios
        .put(
          `${USER_BASE_URL}/addNewItem`,
          {
            newWardrobeItem: newItem,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("reponse recd", res.data);
          if (res.status == 200) {
            console.log(res.status);
            dispatch(setUser(res.data.user));
            toast.success("Item added to wardrobe");
          }
        });
    } catch (error) {
      if (error.response.status == 400) {
        toast.error(
          "This item is already in your dashboard.. Try adding new items"
        );
      }
      console.log("error", error.response);
    }
  };
  const handleDeleteItem = async (item) => {
    try {
      await axios
        .put(
          `${USER_BASE_URL}/deleteItem`,
          { itemToDelete: item },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data.user);
          dispatch(setUser(res.data.user));
          toast.success("Item deleted");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.log(error);
    }
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
      category: "",
      group: "",
    },
    validationSchema: wardrobeSchema,
    onSubmit,
  });
  return (
    <div className="container-fluid">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop
        draggable={false}
        theme="colored"
      />

      <h1 className="text-center mt-5">{`${user.name}'s Wardrobe`}</h1>
      <div className="wardrobe-container">
        {/* SHOW USER WARDROBE */}
        <div className="wardrobe m-2 bg-light">
          <div className="container row gap-3 d-flex justify-content-center">
            {wardrobe && wardrobe.length > 0 ? (
              wardrobe.map((item, index) => (
                <div className="card col-md-3 p-0" key={index}>
                  <div
                    className="card-header border-0 w-100"
                    style={{ backgroundColor: item.color }}
                  >
                    <div
                      className="btn-close bg-danger ms-auto"
                      type="button"
                      onClick={() => handleDeleteItem(item)}
                    ></div>
                  </div>
                  <div
                    className="card-body text-center"
                    id="wardrobe-item"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="card-footer text-center">
                    {`${item.category} (${item.group})`}
                  </div>
                </div>
              ))
            ) : (
              <div className="col text-center">No items to display</div>
            )}
          </div>
        </div>
        {/* ADD ITEM TO WARDROBE */}
        <div className="color-picker d-flex flex-column justify-content-center align-items-center">
          <div className="text-white fw-bold text-center mb-5">
            Add your apparel colors to the wardrobe
          </div>
          <ChromePicker
            color={color}
            onChange={(color) => setColor(color.hex)}
            //   onChangeComplete={(color) => setColor(color.hex)}
          />
          <form className="d-flex flex-column gap-3 mt-5">
            <div>
              <div className={`input-group`}>
                <label htmlFor="category" className="input-group-text">
                  Dress Type
                </label>
                <select
                  name="category"
                  id="category"
                  className={`form-select ${
                    errors.category && "additem-input-error"
                  }`}
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Saree">Saree</option>
                  <option value="Chudidhar">Chudidhar</option>
                  <option value="Kurti">Kurti</option>
                  <option value="Gown">Gown</option>
                  <option value="Lehanga/Choli">Lehanga/Choli</option>
                </select>
              </div>
              <small className="text-danger fw-bolder">
                {errors.category && touched.category && errors.category}
              </small>
            </div>
            <div>
              <div className={`input-group`}>
                <label htmlFor="" className="input-group-text">
                  Wear Type
                </label>
                <select
                  name="group"
                  id="group"
                  className={`form-select ${
                    errors.group && "additem-input-error"
                  }`}
                  value={values.group}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Formal">Formal</option>
                  <option value="Casual">Casual</option>
                  <option value="Party">Party</option>
                </select>
              </div>
              <small className="text-danger fw-bolder">
                {errors.group && touched.group && errors.group}
              </small>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white border-0 rounded p-2"
              style={{ backgroundColor: color ? color : "blue" }}
            >
              {isSubmitting ? "Adding" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
