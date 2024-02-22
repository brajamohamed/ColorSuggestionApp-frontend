import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload };
    },
    addColorToWardrobe: (state, action) => {
      const newColor = action.payload;
      return {
        ...state,
        wardrobe: [newColor, ...state.wardrobe],
      };
    },
    deleteFromWardrobe: (state, action) => {},
  },
});

export const { setUser, addColorToWardrobe } = userSlice.actions;
export default userSlice.reducer;
