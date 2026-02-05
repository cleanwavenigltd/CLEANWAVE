// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: sessionStorage.getItem("token") || null,
//   role: sessionStorage.getItem("role") || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth: (state, action) => {
//       const { token, role } = action.payload;
//       state.token = token;
//       state.role = role;
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("role", role);
//     },
//     clearAuth: (state) => {
//       state.token = null;
//       state.role = null;
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("role");
//     },
//   },
// });

// export const { setAuth, clearAuth } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api"; // Your axios instance
import { act } from "react";

// This is the "Big O" optimization: One request to get everything
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      // This should return { user, wallet, pickups }
      console.log("Fetched user data:", response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch");
    }
  },
);

const initialState = {
  token: sessionStorage.getItem("token") || null,
  role: sessionStorage.getItem("role") || null,
  userData: null, // New: Stores name, email, etc.
  wallet: null, // New: Stores balance
  pickups: [], // New: Stores recent activity
  transactions: [],
  profile: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  isLoading: false, // Boolean for easier access
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      // Restore from sessionStorage on app load
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");
      if (token) {
        state.token = token;
        state.role = role;
      }
    },
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
      state.userData = null;
      state.wallet = null;
      state.profile = null;
      state.transactions = [];
      state.pickups = [];
      state.status = "idle";
      state.isLoading = false;
      state.error = null;
      sessionStorage.clear();
    },
    // New: Update wallet locally after a transaction for instant UI update
    updateLocalWallet: (state, action) => {
      if (state.wallet) state.wallet.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log("Actions :", action);
        state.status = "succeeded";
        state.isLoading = false;
        state.userData = action.payload.user;
        state.wallet = action.payload.wallet;
        state.profile = action.payload;
        state.pickups = action.payload.pickups || [];
        state.transactions = action.payload.transactions || [];
        state.error = null;
        // Sync role just in case
        if (action.payload.user) {
          state.role = action.payload.user.role;
        }
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user data";
      });
  },
});

export const { setAuth, clearAuth, updateLocalWallet, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
