import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;

export const adminLogin = async (adminData) => {
  try {
    const response = await axios.post("/admin/login", adminData);
    return response.data;
  } catch (error) {
    return error.response?.data?.error || "Admin Login failed";
  }
};
export const adminCheckLogin = async () => {
  try {
    const response = await axios.get("/admin/check-login");
    // console.log("Check-login Function:: ", response.data.success);
    return response.data;
  } catch (err) {
    console.log("checklogin ::", err);
    return err.response?.data || "not logged in";
  }
};
export const adminLogout = async () => {
  try {
    const res = await axios.post("/admin/logout");
    console.log("Error loginout ", res);
    return res.data;
  } catch (err) {
    console.log("Logout error:", err);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/admin/total-users");

    return response.data;
  } catch (error) {
    return error.message || "Failed to fetch Users";
  }
};

export const getAllInfo = async () => {
  try {
    const response = await axios.get("/admin/all-info");

    return response.data;
  } catch (error) {
    return error.message || "Failed to fetch feMale users";
  }
};
