import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
      AsyncStorage.setItem("token", token);
      AsyncStorage.setItem("role", role);
    },
    clearAuth: (state) => {
      state.token = null;
      state.role = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("role");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
