import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
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
