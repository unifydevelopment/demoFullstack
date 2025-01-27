import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import Layout from './Layout';
import { createNewUser } from "../api"; // Assuming createNewUser is the correct API function

const User = () => {
  const [role, setRole] = useState(''); // State to store the user's role
  const [form, setform] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [apiError, setApiError] = useState(''); // State to store API error message

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setRole(decoded.role); // Extract and set the role
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Name validation: Required and at least 3 characters long
    if (!form.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    } else if (form.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
      valid = false;
    }

    // Email validation: Required and must be a valid email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!form.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!emailPattern.test(form.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Password validation: Required and at least 6 characters long
    if (!form.password.trim()) {
      errors.password = 'Password is required';
      valid = false;
    } else if (form.password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Start loading state
      setApiError(''); // Clear any previous API error

      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        // Make the API call
        const { data } = await createNewUser(form, token); // Pass the token to the API call

        console.log(data, 'show data');
        // Handle the response after a successful API call
        console.log('API Response:', data);

        // Optionally, reset form fields or show success message
        // setform({ name: '', email: '', password: '' });
      } catch (error) {
        setApiError('An error occurred while creating the user. Please try again.');
        console.error('API Error:', error);
      } finally {
        setLoading(false); // Stop loading state
      }
    }
  };

  return (
    <Layout showHeader={true} showSidebar={true} showNavbar={true} showFooter={true}>
      <div className="container mt-5">
        <h1 className="mb-4">Create User</h1>

        {apiError && <div className="alert alert-danger">{apiError}</div>} {/* Show API error if any */}

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
              placeholder="Enter your name"
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default User;
