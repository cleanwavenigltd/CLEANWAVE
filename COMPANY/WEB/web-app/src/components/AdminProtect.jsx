import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtect = ({ children }) => {
  const role = useSelector((state) => state.auth.role);
  console.log("Admin role ::",role)
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

AdminProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtect;
