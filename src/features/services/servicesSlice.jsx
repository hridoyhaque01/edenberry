import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "guide",
  innerActiveTab: "postpartum",
};

const servicesSlice = createSlice({
  name: "servicesSlice",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
    changeInnerTab: (state, action) => {
      state.innerActiveTab = action.payload;
    },
  },
});

export default servicesSlice.reducer;
export const { changeTab, changeInnerTab } = servicesSlice.actions;
