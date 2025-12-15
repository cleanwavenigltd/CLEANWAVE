import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;

export const register = async (userData) => {
  try {
    const response = await axios.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    return error.message || "Registration failed";
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post("/auth/login", userData);
    console.log("Response:", response);
    
    return response.data;
  } catch (error) {
    console.log("ERoor", error.message);
    return error.response?.data?.error || "Login failed";
  }
};
export const checkLogin = async () => {
  try {
    const response = await axios.get("/auth/check-login");
    console.log("Check-login Function:: ", response.response);
    return response.data;
  } catch (err) {
    console.log("checklogin ::", err);
    return err.response?.data || "not logged in";
  }
};
export const logout = async () => {
  try {
    const res = await axios.post("/auth/logout");
    console.log("Error loginout ", res);
    return res.data;
  } catch (err) {
    console.log("Logout error:", err);
    return null;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get("/auth/profile");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message || "not data found";
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put("/admin/update-profile", profileData);
    return response.data;
  } catch (error) {
    return error.message || "Update failed";
  }
};

export const walletBalance = async () => {
  try {
    const response = await axios.get("/wallet/balance");
    console.log(response.data);

    return response.data;
  } catch (error) {
    return error.message || "No data found";
  }
};
