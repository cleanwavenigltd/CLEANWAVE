import api from "../utils/api";

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    return error.response?.data || "Registration failed";
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log("Login Response:", response.data);
    console.log("Login Response Status:", response.status);

    return response.data;
  } catch (error) {
    console.log("Login Error:", error.message);
    console.log("Login Error Response:", error.response?.data);
    return error.response?.data?.error || "Login failed";
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    console.log("Error loginout ", res);
    return res.data;
  } catch (err) {
    console.log("Logout error:", err);
    return null;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message || "not data found";
  }
};
