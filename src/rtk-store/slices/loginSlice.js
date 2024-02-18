import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log("slice", action.payload);
      return action.payload;
    },
  },
});
export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
