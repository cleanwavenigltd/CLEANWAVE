import api from "../utils/api";


export const register = async (userData) => {
  try {
    const response = await api.post("/aggregator/register", userData);
    console.log("Aggregator register response:", response);
    return response.data;
  } catch (error) {
    console.error("Error registering aggregator:", error);
    return error.response.data.error || "Registration failed";
  }
};
export const getAggregators = async () => {
  try {
    const response = await api.get("/aggregator/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching aggregators:", error);
    return error.message || "Failed to fetch pickups";
  }
};

export const getAgent = async () => {
  try {
    const response = await api.get("/agents/get");

    return response.data;
  } catch (error) {
    console.error("Error fetching Agents:", error);
    return error.message || "Failed to fetch Agents";
  }
};
