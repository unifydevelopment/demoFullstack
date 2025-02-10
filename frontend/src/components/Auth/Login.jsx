// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../../api";
import { saveToken } from "../../utils";
import Layout from '../../pages/Layout';
import '../../../src/styles/login.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import loginSchema from "../../validations/loginValidation"; // Import Joi Schema

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  // Validate form using Joi
  const validateForm = () => {
    const { error } = loginSchema.validate(form, { abortEarly: false });

    if (error) {
      const tempErrors = {};
      error.details.forEach((err) => {
        tempErrors[err.path[0]] = err.message;
      });
      setErrors(tempErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      const { data } = await login(form);
      saveToken(data.token);
      toast.success("Login successful!");

      // Navigate based on role
      navigate(data.role === "admin" ? "/dashboard" : "/");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);

      // Show backend validation errors if exist
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Login failed!");
      }
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
                className="input-field"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                name="password"
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
