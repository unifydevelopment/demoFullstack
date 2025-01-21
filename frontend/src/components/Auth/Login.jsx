// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../../api";
import { saveToken } from "../../utils";
import Layout from '../../pages/Layout';
import '../../../src/styles/login.css';

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await login(form);
        console.log(data,'show data')
        saveToken(data.token);
        // localStorage.setItem("role", data.role); // Save role
        alert("Login successful!");
        window.location.href = data.role === "admin" ? "/dashboard" : "/";
      } catch (error) {
        console.error("Login error:", error.response.data.message);
      }
    };

  return (
    <Layout showSidebar={false} showNavbar={false} showFooter={false}>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <input
                name="email"
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <input
                name="password"
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
