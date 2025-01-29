import React, { useState } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../api";
import { toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    profile_image: null, // Add profile_image to the state
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image") {
      // Handle file input separately
      setForm({ ...form, profile_image: files[0] });

      // Create an object URL for the selected file and set the preview
      const file = files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null); // Clear preview if no file is selected
      }
    } else {
      setForm({ ...form, [name]: value });
    }
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

    if (!form.password.trim()) {
      errors.password = "Password is required";
      valid = false;
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

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      if (form.profile_image) {
        formData.append("profile_image", form.profile_image); // Append the image file
      }

      try {
        const { data } = await createNewUser(formData); // Pass FormData to API
        console.log("API Response:", data);

        setForm({ name: "", email: "", password: "", role: "user", profile_image: null });
        setImagePreview(null); // Clear preview after successful submission
        toast.success(data.message);
        setTimeout(() => {
          navigate("/user");
        }, 1000);
      } catch (error) {
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
        <h1 className="mb-4">Create User</h1>

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

          <div className="mb-3">
            <label htmlFor="profile_image" className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              id="profile_image"
              name="profile_image"
              onChange={handleChange}
            />
            {errors.profile_image && <div className="text-danger">{errors.profile_image}</div>}

            {/* Display image preview if available */}
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Profile Preview" className="img-thumbnail" width="150" />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default User;
