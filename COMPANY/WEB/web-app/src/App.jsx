import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
// import Navbar from "./components/Navbar";
import AuthScreen from "./pages/Auth/Auth";
import WasteHome from "./pages/waste/WasteHome";
import VerifyEmail from "./pages/Auth/verifyEmail";
import { startTokenTimer } from "./utils/tokenManager";
import AggregatorHome from "./pages/aggregator/AggregatorHome";
import AgentHome from "./pages/agent/AgentHome";

//Protection Routes
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtect from "./components/AdminProtect";
import AggregatorProtect from "./components/AggregatorProtect";
import AgentProtect from "./components/AgentProtect";
import WasteProtect from "./components/WasteProtect";

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) startTokenTimer(token);
  }, []);

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path={`/${import.meta.env.VITE_ADMIN_LOGIN}`}
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={
            <AdminProtect>
              <Dashboard />
            </AdminProtect>
          }
        />
        {/* unprotedted Home before Testing*/}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waste-bank"
          element={
            <WasteProtect>
              <WasteHome />
            </WasteProtect>
          }
        />
        <Route
          path="/aggregator"
          element={
            <AggregatorProtect>
              <AggregatorHome />
            </AggregatorProtect>
          }
        />
        <Route
          path="/agent"
          element={
            <AgentProtect>
              <AgentHome />
            </AgentProtect>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
