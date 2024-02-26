import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Wardrobe.css";
import { USER_BASE_URL } from "../../../api/user.api";
import { SwatchesPicker, SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { addColorToWardrobe } from "../../../rtk-store/slices/userSlice";

const Wardrobe = () => {
  const user = useSelector((state) => state.user);
  const [wardrobe, setWardrobe] = useState(user.wardrobe);
  console.log(wardrobe);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [color, setColor] = useState("FF0000");
  useEffect(() => {
    setWardrobe(user.wardrobe);
  }, [user.wardrobe]);
  const addToWardrobe = async () => {
    try {
      await axios
        .put(
          `${USER_BASE_URL}/update`,
          {
            wardrobe: color,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("reponse recd", res.data);
          if (res.status == 200) {
            console.log(res.status);
            dispatch(addColorToWardrobe(color));
            alert("This color has been successfully added to your dashboard");
          }
        });
    } catch (error) {
      if (error.response.status == 400) {
        alert("This color is already added to your dashboard");
      }
      console.log("error", error.response.data);
    }
  };
  return (
    <div className="wardrobe-container">
      <h1 className="text-center">Wardrobe</h1>
      <div className="wardrobe container m-5 bg-warning">
        <div className="row d-flex justify-content-center gap-3">
          {wardrobe &&
            wardrobe.map((item, index) => (
              <div className="col-lg-3 card" key={index}>
                <div className="card-body" style={{ backgroundColor: item }}>
                  {item}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="color-picker d-flex flex-column justify-content-center align-items-center">
        <div className="text-white fw-bold text-center mb-5">
          Add your apparel colors to the wardrobe
        </div>
        <SwatchesPicker
          color={color}
          onChange={(color) => setColor(color.hex)}
          //   onChangeComplete={(color) => setColor(color.hex)}
        />
        <button
          type="button"
          onClick={() => addToWardrobe()}
          className="text-white border-0 rounded py-2 px-3 mt-5"
          style={{ backgroundColor: color }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Wardrobe;
