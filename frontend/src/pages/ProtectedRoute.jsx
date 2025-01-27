import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure you have jwt-decode installed: npm install jwt-decode

const ProtectedRoute = ({ children, requiredRole }) => {
const token = localStorage.getItem("token");

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token to check its validity and role
    const decodedToken = jwtDecode(token);
    const { role, exp } = decodedToken;

    // Check if the token is expired
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token"); // Optionally remove the expired token
      return <Navigate to="/login" />;
    }

    // Check if the user has the required role
    if (role !== requiredRole) {
      return <Navigate to="/login" />;
    }

    // If all checks pass, render the children
    return children;
  } catch (error) {
        console.error("Error decoding token:", error);
        return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
