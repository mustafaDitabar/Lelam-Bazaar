// src/components/RequireAuth.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RequireAccsess = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

if (!auth || !auth.accessToken) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAccsess;
