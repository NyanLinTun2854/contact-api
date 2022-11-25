import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Guard = ({ children }) => {
  const state = useSelector((state) => state.user.value);
  if (state?.success) return children;
  else return <Navigate to="/login" />;
};

export default Guard;
