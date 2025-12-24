import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AggregatorProtect = ({ children }) => {
  const role = useSelector((state) => state.auth.role);

  if (role !== "aggregator") {
    return <Navigate to="/" replace />;
  }

  return children;
};

AggregatorProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AggregatorProtect;
