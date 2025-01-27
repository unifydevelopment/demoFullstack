import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import User from "../pages/User";
import AdminDashboard from "../components/AdminDashboard";
import ProtectedRoute from "../pages/ProtectedRoute"; // Adjusted import path for ProtectedRoute

const RoutesFile = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRole="admin">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute requiredRole="admin">
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute requiredRole="admin">
            <Setting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesFile;
