import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AgentProtect = ({ children }) => {
  const role = useSelector((state) => state.auth.role);

  if (role !== "agent") {
    return <Navigate to="/" replace />;
  }

  return children;
};

AgentProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AgentProtect;
