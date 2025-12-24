import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  role: sessionStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
    },
    clearAuth: (state) => {
      state.token = null;
      state.role = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
