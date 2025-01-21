import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import AdminDashboard from "../components/AdminDashboard";
import ProtectedRoute from "../pages/ProtectedRoute";

// Define all your routes here
const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesFile;
