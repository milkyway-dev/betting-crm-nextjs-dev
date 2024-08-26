import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    Agent: {
      username:'',
      Id:Number
    },
    openNotification:false,
    openHeader: false,
    updateCredit:null
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
    },
    UpdateCredit: (state,action) => {
      state.updateCredit=action.payload
    }
  },
});

export const {
  UpdateName,
  UpdateNotification,
  UpdateHeader,
  UpdateCredit
} = reduxSlice.actions;
export default reduxSlice.reducer;