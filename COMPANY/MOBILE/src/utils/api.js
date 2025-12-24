import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust for your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // For React Native, use AsyncStorage instead
    console.log("API Interceptor - Token:", token ? "present" : "missing");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("API Interceptor - Added Authorization header with Bearer");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
