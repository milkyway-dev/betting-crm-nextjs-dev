import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "globlestate",
  initialState: {
    Agent: {
      username:'',
      Id:Number
    }
  },
  reducers: {
    UpdateName: (state, action) => {
      console.log(action?.payload)
      state.Agent=action.payload
    }
  },
});

export const {
  UpdateName
} = reduxSlice.actions;
export default reduxSlice.reducer;