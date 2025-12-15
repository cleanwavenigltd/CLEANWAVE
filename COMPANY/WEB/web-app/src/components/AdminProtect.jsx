import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { adminCheckLogin, adminLogout } from "../services/adminService";

const AdminProtect = ({ children }) => {
  const [status, setStatus] = useState({ loading: true, allowed: false });

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      try {
        const resp = await adminCheckLogin();
        console.log("AdminProtect checkLogin response:", resp?.role);

        if (!mounted) return;

        if (!resp?.success || resp.role !== "admin") {
          // Optionally clear session on failure:
          // await adminLogout();
          setStatus({ loading: false, allowed: false });
        } else {
          setStatus({ loading: false, allowed: true });
        }
      } catch (error) {
        console.error("AdminProtect error:", error);
        if (mounted) setStatus({ loading: false, allowed: false });
      }
    };

    checkAdmin();
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

AdminProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtect;
