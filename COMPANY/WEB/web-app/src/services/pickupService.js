import api from "../utils/api";


export const requestPickup = async (pickupData) => {
  try {
    const response = await api.post("/pickups/create", pickupData);

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
    const response = await api.post("/pickups/waste-pickup", pickupData);

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
    const response = await api.get("/pickups/count");

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

export const getPendingPickups = async () => {
  try {
    const response = await api.get("/pickups/agent/pending");

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching agent pickups:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch agent pickups",
    };
  }
};

export const getAcceptedPickups = async () => {
  try {
    const response = await api.get("/pickups/agent/accepted");

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching accepted pickups:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch accepted pickups",
    };
  }
};

export const acceptPickup = async (id) => {
  try {
    const response = await api.post(`/pickups/${id}/accept`);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error accepting pickup:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to accept pickup",
    };
  }
};

export const getDeliveredPickups = async () => {
  try {
    const response = await api.get("/pickups/agent/delivered");

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching delivered pickups:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch delivered pickups",
    };
  }
};

export const getPickupDetails = async (pickupId) => {
  try {
    const response = await api.get(`/pickups/${pickupId}`);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching pickup details:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch pickup details",
    };
  }
};

export const updatePickupStatus = async (pickupId, status) => {
  try {
    const response = await api.put(`/pickups/${pickupId}/status`, { status });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error updating pickup status:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to update pickup status",
    };
  }
};

export const cancelPickup = async (pickupId) => {
  try {
    const response = await api.delete(`/pickups/${pickupId}`);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error cancelling pickup:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to cancel pickup",
    };
  }
};

export const wasteDelivered = async (data) => {
  try {
    const response = await api.post("pickups/waste-bank/delivered", data);
    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      message:
        err.response?.data?.error || err.message || "failed to submit pickup",
    };
  }
};
