import React, { useState } from "react";
import { register } from "../../api";
import { toast } from 'react-toastify';
import signupSchema from "../../validations/signupValidation"; // Import Joi schema

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  // Validate form using Joi
  const validateForm = () => {
    const { error } = signupSchema.validate(form, { abortEarly: false });

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      await register(form);
      toast.success("Signup successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);

      // Show backend validation errors if exist
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Signup failed!");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: "25rem" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Signup</h3>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>

            {/* Role Select */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                name="role"
                id="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <span className="text-danger">{errors.role}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
