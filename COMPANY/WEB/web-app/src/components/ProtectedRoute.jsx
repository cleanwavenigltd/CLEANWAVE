import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// import { adminCheckLogin, adminLogout } from "../services/adminService";
import { checkLogin } from "../services/authservice";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState({ loading: true, allowed: false });

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        const resp = await checkLogin();
        console.log("ProtectedRoute checkLogin response:", resp?.role);

        if (!mounted) return;

        if (!resp?.success || resp.role !== "user") {
          // Optionally clear session on failure:
          // await adminLogout();
          setStatus({ loading: false, allowed: false });
        } else {
          setStatus({ loading: false, allowed: true });
        }
      } catch (error) {
        console.error("ProtectedRoute error:", error);
        if (mounted) setStatus({ loading: false, allowed: false });
      }
    };

    checkUser();
    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) {
    // Return null or a spinner/placeholder while checking
    return null;
  }

  if (!status.allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
