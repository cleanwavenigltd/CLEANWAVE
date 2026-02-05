import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "home",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    resetUI: (state) => {
      state.activeTab = "home";
    },
  },
});

export const { setActiveTab, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
