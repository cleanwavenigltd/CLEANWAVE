import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;
export const registerWaste = async (userData) => {
  try {
    const response = await axios.post("/wastebank/register", userData);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.error || error.message || "Registration failed",
    };
  }
};

export const getWasteBanks = async () => {
  try {
    const response = await axios.get("/wastebank/get-all");
    console.log("resp", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching Wastebanks:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch Wastebanks",
    };
  }
};

export const getWasteBank = async () => {
  try {
    const response = await axios.get("/wastebank/get");
    console.log("resp", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching Wastebanks:", error);
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch Wastebanks",
    };
  }
};

export const createWasteCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      "/waste-categories/categories",
      categoryData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to create waste category",
    };
  }
};

// export { createWasteCategory };
export const getWasteCategories = async () => {
  try {
    const response = await axios.get("/waste-categories/categories");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch waste categories",
    };
  }
};

export const getConWasteBank = async () => {
  try {
    const response = await axios.get("/wastebank/conn-waste-bank");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching Wastebanks:", error);
    return (
      error.response?.data.error || error.message || "Failed to get Wastebanks"
    );
  }
};
