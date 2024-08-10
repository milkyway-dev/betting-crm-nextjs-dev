import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    showNotification:false
  },
  reducers: {
    UpdateNotification: (state, action) => {
      state.showNotification=action.payload
    },
  },
});

export const {
  UpdateNotification
} = reduxSlice.actions;
export default reduxSlice.reducer;