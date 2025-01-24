// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../../api";
import { saveToken } from "../../utils";
import Layout from '../../pages/Layout';
import '../../../src/styles/login.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" }); // State for validation errors
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user changes input
  };

  // Validate form before submitting
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Email validation
    if (!form.email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email is invalid.";
      isValid = false;
    }

    // Password validation
    if (!form.password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Return early if validation fails

    try {
      const { data } = await login(form);
      console.log(data, 'show data');
      saveToken(data.token);
      toast.success('Login successful!');
      
      // Navigate based on role without page reload
      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Layout showHeader={false} showSidebar={false} showNavbar={false} showFooter={false}>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="email"
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>} {/* Display email error */}
            </div>

            <div className="form-group">
              <input
                name="password"
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>} {/* Display password error */}
            </div>

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
