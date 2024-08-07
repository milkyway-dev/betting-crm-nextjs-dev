import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    UserName:'React Js'
  },
  reducers: {
    UpdateName: (state, action) => {
      state.UserName=action.payload
    },
  },
});

export const {
 UpdateName
} = reduxSlice.actions;
export default reduxSlice.reducer;