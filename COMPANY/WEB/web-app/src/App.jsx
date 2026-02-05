// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Provider,useDispatch,useSelector } from "react-redux";
// import { store } from "./store/store";
// import { useEffect } from "react";
// import Home from "./pages/user/Home";
// import Dashboard from "./pages/admin/Dashboard";
// import Login from "./pages/admin/Login";
// // import Navbar from "./components/Navbar";
// import AuthScreen from "./pages/Auth/Auth";
// import WasteHome from "./pages/waste/WasteHome";
// import VerifyEmail from "./pages/Auth/verifyEmail";
// import { startTokenTimer } from "./utils/tokenManager";
// import AggregatorHome from "./pages/aggregator/AggregatorHome";
// import AgentHome from "./pages/agent/AgentHome";
// import NotFound from "./pages/Auth/NotFound";

// //Protection Routes
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminProtect from "./components/AdminProtect";
// import AggregatorProtect from "./components/AggregatorProtect";
// import AgentProtect from "./components/AgentProtect";
// import WasteProtect from "./components/WasteProtect";
// import { UserProvider } from "./contexts/UserContext";
// export default function App() {
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) startTokenTimer(token);
//   }, []);

//   return (
//     <Provider store={store}>
//       <UserProvider>
//         <Router>
//           {/* <Navbar /> */}
//           <Routes>
//             <Route path="/" element={<AuthScreen />} />
//             <Route path="/verify-email" element={<VerifyEmail />} />
//             <Route
//               path={`/${import.meta.env.VITE_ADMIN_LOGIN}`}
//               element={<Login />}
//             />
//             <Route
//               path="/dashboard"
//               element={
//                 <AdminProtect>
//                   <Dashboard />
//                 </AdminProtect>
//               }
//             />
//             {/* unprotedted Home before Testing*/}
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/waste-bank"
//               element={
//                 <WasteProtect>
//                   <WasteHome />
//                 </WasteProtect>
//               }
//             />
//             <Route
//               path="/aggregator"
//               element={
//                 <AggregatorProtect>
//                   <AggregatorHome />
//                 </AggregatorProtect>
//               }
//             />
//             <Route
//               path="/agent"
//               element={
//                 <AgentProtect>
//                   <AgentHome />
//                 </AgentProtect>
//               }
//             />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </Router>
//       </UserProvider>
//     </Provider>
//   );
// }

import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";

// Actions & Utils
import { fetchUserData, initializeAuth } from "./store/authSlice";
import { startTokenTimer } from "./utils/tokenManager";

// Lazy load pages for code splitting - 300ms rule optimization
const Home = lazy(() => import("./pages/user/Home"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Login = lazy(() => import("./pages/admin/Login"));
const AuthScreen = lazy(() => import("./pages/Auth/Auth"));
const WasteHome = lazy(() => import("./pages/waste/WasteHome"));
const VerifyEmail = lazy(() => import("./pages/Auth/verifyEmail"));
const AggregatorHome = lazy(() => import("./pages/aggregator/AggregatorHome"));
const AgentHome = lazy(() => import("./pages/agent/AgentHome"));
const NotFound = lazy(() => import("./pages/Auth/NotFound"));

// Protection Logic
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Loading Spinner Component
const LazyLoadSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8CA566] rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function AppContent() {
  const dispatch = useDispatch();
  const {
    userData,
    isLoading,
    role,
    token: reduxToken,
  } = useSelector((state) => state.auth);
  const sessionToken = sessionStorage.getItem("token");
  const token = sessionToken || reduxToken;

  // Initialize auth from session storage on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Fetch user data when token exists but userData doesn't
  useEffect(() => {
    if (token && !userData) {
      startTokenTimer(token);
      dispatch(fetchUserData());
    }
  }, [dispatch, sessionToken, reduxToken, userData]);

  // Show loading screen while fetching initial auth data
  if (token && isLoading && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8CA566] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading Cleanwave...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthScreen />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path={`/${import.meta.env.VITE_ADMIN_LOGIN}`}
          element={<Login />}
        />

        {/* Role-Based Protected Routes 
          Instead of 5 different components, we use one dynamic logic.
          */}
        <Route
          path="/home"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <Home />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              {" "}
              <Dashboard />{" "}
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/wastebank"
          element={
            <RoleProtectedRoute allowedRoles={["wastebank"]}>
              {" "}
              <WasteHome />{" "}
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/aggregator"
          element={
            <RoleProtectedRoute allowedRoles={["aggregator"]}>
              {" "}
              <AggregatorHome />{" "}
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/agent"
          element={
            <RoleProtectedRoute allowedRoles={["agent"]}>
              {" "}
              <AgentHome />{" "}
            </RoleProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Keep Provider at the very top so AppContent can use Redux hooks
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
