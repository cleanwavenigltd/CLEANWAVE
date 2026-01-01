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
export const checkLogin = async () => {
  try {
    const response = await api.get("/auth/check-login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Check-login Function:: ", response.data);
    return response.data;
  } catch (err) {
    console.log("checklogin ::", err);
    return err.response?.data || "not logged in";
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

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/admin/update-profile", profileData);
    return response.data;
  } catch (error) {
    return error.message || "Update failed";
  }
};

export const walletBalance = async () => {
  try {
    const response = await api.get("/wallet/balance");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error in Wallet Balance ROute:: ", error);
    return error.message || "No data found";
  }
};

export const checkAccountNumber = async (accountNumber) => {
  try {
    const response = await api.post("/transactions/verify-account", {
      accountNumber,
    });
    console.log("Check Account Number Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking account number:", error);
    return error.response?.data || "Account check failed";
  }
};

export const transferFunds = async (transferData) => {
  try {
    const response = await api.post("/transactions/transfer", transferData);
    console.log("Transfer Funds Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error transferring funds:", error);
    return error.response?.data || "Transfer failed";
  }
};

export const getTransactionHistory = async () => {
  try {
    const response = await api.get("/transactions/get");
    console.log("Transaction History Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return error.message || "Failed to fetch transaction history";
  }
};
