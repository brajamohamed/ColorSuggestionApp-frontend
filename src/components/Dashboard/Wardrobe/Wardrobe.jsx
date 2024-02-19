import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_BASE_URL } from "../../../api/user.api";
const Wardrobe = () => {
  const [wardrobe, setWardrobe] = useState([]);
  const token = localStorage.getItem("token");
  console.log("token got from local storage:", token);
  const user = async () => {
    await axios
      .get(`${USER_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        const wardrobe = res.data.wardrobe;
      });
  };
  useEffect(() => {
    user();
  }, []);

  return <div>Wardrobe</div>;
};

export default Wardrobe;
