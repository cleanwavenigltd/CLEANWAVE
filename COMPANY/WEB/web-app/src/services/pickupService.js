import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;

export const requestPickup = async (pickupData) => {
  try {
    const response = await axios.post("/pickups/create", pickupData);

    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error requesting pickup:", error);
    return {
      success: false,
      message:
        error.response?.data?.error || error.message || "Pickup request failed",
    };
  }
};
export const requestWastePickup = async (pickupData) => {
  try {
    const response = await axios.post("/pickups/waste-pickup", pickupData);

    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error requesting pickup:", error);
    return {
      success: false,
      message:
        error.response?.data?.error || error.message || "Pickup request failed",
    };
  }
};

export const getPickupsCount = async () => {
  try {
    const response = await axios.get("/pickups/count");

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching pickups:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch pickups",
    };
  }
};
