import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    Agent: {
      username:'',
      Id:Number
    },
    openNotification:false
  },
  reducers: {
    UpdateName: (state, action) => {
      state.Agent=action.payload
    },
    UpdateNotification: (state, action) => {
      state.openNotification=action.payload
    }
  },
});

export const {
  UpdateName,
  UpdateNotification
} = reduxSlice.actions;
export default reduxSlice.reducer;