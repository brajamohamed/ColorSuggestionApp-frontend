import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setUser, addItemToWardrobe, deleteFromWardrobe } =
  userSlice.actions;
export default userSlice.reducer;
