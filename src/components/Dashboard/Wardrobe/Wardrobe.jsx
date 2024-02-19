import React, { useEffect } from "react";
import axios from "axios";
import { USER_BASE_URL } from "../../../api/user.api";
const Wardrobe = () => {
  const token = localStorage.getItem("token");
  console.log("token got from local storage:", token);
  const user = async () =>
    await axios.get(`${USER_BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  useEffect(() => {
    user();
  }, []);
  return <div>Wardrobe</div>;
};

export default Wardrobe;
