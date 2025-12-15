import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;

export const registerAgent = async (userData) => {
  try {
    const response = await axios.post("/agents/register", userData);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.error || error.message || "Registration failed",
    };
  }
};

export const getAgents = async () => {
  try {
    const response = await axios.get("/agents/get-all");
    return response.data;
  } catch (error) {
    return error.message || "Failed to fetch Agents";
  }
};

export function deleteAgent() {
  return "hello";
}
export const getPendingPickups = async () => {};
export const getAcceptedPickups = async () => {};
export const getDeliveredPickups = async () => {};
export const acceptPickup = async (id) => {};
