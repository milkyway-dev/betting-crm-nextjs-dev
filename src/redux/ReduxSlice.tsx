import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    Agent: {
      username:'',
      Id:Number
    },
    openNotification:false,
    openHeader:false
  },
  reducers: {
    UpdateName: (state, action) => {
      state.Agent=action.payload
    },
    UpdateNotification: (state, action) => {
      state.openNotification=action.payload
    },
    UpdateHeader: (state, action) => {
      state.openHeader=action.payload
    }
  },
});

export const {
  UpdateName,
  UpdateNotification,
  UpdateHeader
} = reduxSlice.actions;
export default reduxSlice.reducer;