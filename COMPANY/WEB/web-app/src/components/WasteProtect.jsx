import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WasteProtect = ({ children }) => {
  const role = useSelector((state) => state.auth.role);

  if (role !== "waste") {
    return <Navigate to="/" replace />;
  }

  return children;
};

WasteProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WasteProtect;
