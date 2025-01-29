import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import { getUserData,editUserData } from "../../api"; // Assuming getUserData fetches user data, and editUserData edits it
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from the URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  
  // Fetch user data when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode(token); // Decode if necessary
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const { data } = await getUserData(id); // Fetch user data using the provided ID
        setForm({
          name: data.name || "",
          email: data.email || "",
          password: "", // Keep password empty for security purposes
          role: data.role || "user"
        });
      } catch (error) {
        setApiError("An error occurred while fetching user data.");
        console.error("API Error:", error.message || error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    let valid = true;

    if (!form.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    } else if (form.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
      valid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!form.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(form.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!form.password.trim() && !form.password.length) {
      // Password can be optional in edit case, only update if provided
    } else if (form.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setApiError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token is missing. Please log in again.");

        console.log(form);
        // Call the API to update user data
        const { data } = await editUserData(id, form); // Call editUserData API
        console.log("API Response:", data);

        setForm({ name: "", email: "", password: "", role: "user" });
        toast.success(data.message);
        setTimeout(() => {
          navigate("/user"); // Redirect to User List page
        }, 1000);
      } catch (error) {
        setApiError("An error occurred while updating the user. Please try again.");
        console.error("API Error:", error.message || error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout showHeader={true} showSidebar={true} showNavbar={true} showFooter={true}>
      <div className="container mt-5">
        <h1 className="mb-4">Edit User</h1>
        {apiError && <div className="alert alert-danger">{apiError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          {/* Hidden role field */}
          <input type="hidden" name="role" value={form.role} />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditUser;
