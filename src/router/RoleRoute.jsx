import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { roleDashboardPath } from "../utils/constants";

export const RoleRoute = ({ allow = [], children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const ok = allow.includes(user.role);
  if (!ok) return <Navigate to={roleDashboardPath(user.role)} replace />;

  return children;
};