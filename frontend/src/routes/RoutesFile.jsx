import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateUser from "../pages/user/create";
import EditUser from "../pages/user/edit";
import Setting from "../pages/Setting";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
// import User from "../pages/User";
import UserListing from "../pages/user/listing";
import AdminDashboard from "../components/AdminDashboard";
import ProtectedRoute from "../pages/ProtectedRoute"; // Adjusted import path for ProtectedRoute
import { isAuthenticated } from "../utils"; // Import Auth Utility

const RoutesFile = () => {
  return (
    <Routes>
      {/* Public Routes */}
      
      {/* Redirect to dashboard if already logged in */}
      <Route path="/signup" element={isAuthenticated() ? <Navigate to="/" /> : <Signup />} />
      <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
      
      {/* Protected Routes */}

      <Route path="/" element={<ProtectedRoute requiredRole="admin">
            <Home />
       </ProtectedRoute>} />

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
            <UserListing />
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
      <Route
        path="/create-user"
        element={
          <ProtectedRoute requiredRole="admin">
            < CreateUser/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-user/:id"
        element={
          <ProtectedRoute requiredRole="admin">
            < EditUser/>
          </ProtectedRoute>
        }
      />
    </Routes>

    
  );
};

export default RoutesFile;
