import { jwtDecode } from "jwt-decode";
import { logout } from "./auth";
import { store } from "../store/store";
import { clearAuth } from "../store/authSlice";

let logoutTimer = null;

export const startTokenTimer = (token) => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const expiry = decoded.exp * 1000; // convert to ms
    const now = Date.now();
    const timeLeft = expiry - now;

    if (timeLeft <= 0) {
      logout();
      return;
    }

    // Clear any previous timers
    if (logoutTimer) clearTimeout(logoutTimer);

    // AUTO LOGOUT
    logoutTimer = setTimeout(() => {
      store.dispatch(clearAuth());
      logout();
      //   alert("Your session has expired. Please log in again.");
      window.location.href = "/"; // redirect to login
    }, timeLeft);
  } catch (err) {
    console.error("Invalid token:", err);

    logout();
  }
};
