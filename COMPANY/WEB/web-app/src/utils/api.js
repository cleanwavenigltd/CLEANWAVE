import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Force JSON headers
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    console.log(
      "API Interceptor - Token:",
      token ? "present" : "missing" + api,
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("API Interceptor - Added Authorization header with Bearer");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

// import axios from "axios";

// const api = axios.create({
//   // Ensure your .env variable is prefixed with VITE_ if using Vite
//   baseURL: import.meta.env.VITE_APP_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");

//     if (token) {
//       // Use config.headers.set if using Axios 1.x+, or standard assignment
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Log only in development mode to keep production logs clean
//     if (import.meta.env.DEV) {
//       console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`,
//         token ? "Auth: Yes" : "Auth: No");
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
