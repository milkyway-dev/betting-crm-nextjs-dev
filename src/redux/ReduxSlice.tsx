import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    name:'React'
  },
  reducers: {
    UpdateName: (state,action) => {
      state.name=action.payload
    }
  },
});

export const {
} = reduxSlice.actions;
export default reduxSlice.reducer;