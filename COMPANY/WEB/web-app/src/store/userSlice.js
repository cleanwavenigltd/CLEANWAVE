// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/api";

// // This is the "Super Fetch" that gets everything in one go
// export const fetchUserData = createAsyncThunk(
//   "user/fetchDashboard",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/auth/me"); // One request to Rule them all
//       return response.data; // Expecting: { user, wallet, pickups, notifications }
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     profile: null,
//     wallet: null,
//     pickups: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     // For manual updates (e.g., after a successful pickup)
//     updateWallet: (state, action) => {
//       state.wallet.balance = action.payload;
//     },
//     logout: (state) => {
//       state.profile = null;
//       state.wallet = null;
//       state.pickups = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardData.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchDashboardData.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.profile = action.payload.user;
//         state.wallet = action.payload.wallet;
//         state.pickups = action.payload.pickups;
//       })
//       .addCase(fetchDashboardData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { updateWallet, logout } = userSlice.actions;
// export default userSlice.reducer;
