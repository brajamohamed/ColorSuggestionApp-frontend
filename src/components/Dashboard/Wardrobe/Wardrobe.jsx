import React, { useEffect, useState } from "react";
import axios from "axios";
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
          }
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="wardrobe-contianer">
      <div className="wardrobe-form-contianer border-bottom">
        <div>Add your apparel colors to the wardrobe</div>
        <SwatchesPicker
          color={color}
          onChange={(color) => setColor(color.hex)}
          //   onChangeComplete={(color) => setColor(color.hex)}
        />
        <button
          type="button"
          onClick={() => addToWardrobe()}
          className=" border-0 rounded p-2"
          style={{ backgroundColor: color }}
        >
          Add
        </button>
      </div>
      <div className="wardrobe">
        <ul>
          {wardrobe &&
            wardrobe.map((item, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <div style={{ backgroundColor: item }}>{item}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Wardrobe;
