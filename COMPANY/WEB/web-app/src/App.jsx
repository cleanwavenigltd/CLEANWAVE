import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
import { UserProvider } from "./contexts/UserContext";
export default function App() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) startTokenTimer(token);
  }, []);

  return (
    <Provider store={store}>
      <UserProvider>
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
                // <AdminProtect>
                  <Dashboard />
                // </AdminProtect>
              }
            />
            {/* unprotedted Home before Testing*/}
            <Route
              path="/home"
              element={
                // <ProtectedRoute>
                  <Home />
                // </ProtectedRoute>
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
                // <AgentProtect>
                  <AgentHome />
                // </AgentProtect>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </UserProvider>
    </Provider>
  );
}

// src/App.jsx (Conceptual file that replaces your main App routing)
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useUser } from "./contexts/UserContext";

// // Import your different layouts

// // A utility component to protect routes and choose the correct layout
// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user, isLoading, role } = useUser();

//   if (isLoading) {
//     return <div>Loading Application...</div>; // Show a loading screen
//   }

//   if (!user || !role || !allowedRoles.includes(role)) {
//     // If not logged in or role not allowed, redirect to login
//     return <Navigate to="/login" replace />;
//   }

//   // Render the appropriate layout based on the *actual* role from the context
//   switch (role) {
//     case "wastebank":
//       return <WasteHome />;
//     case "aggregator": // Assuming WasteLayout handles both aggregator/wastebank
//       return <AggregatorHome />;
//     case "agent":
//       return <AgentHome />;
//     case "admin":
//       return <Dashboard />;
//     default:
//       return <Navigate to="/" replace />; // Fallback
//   }
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthScreen />} />

//         {/* Protect the main dashboard route */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute
//               allowedRoles={["wastebank", "aggregator", "agent", "admin"]}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
