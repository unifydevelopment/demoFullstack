

// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import Layout from './Layout';

const Profile = () => {
  const [role, setRole] = useState(''); // State to store the user's role

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

  return (
    <Layout showSidebar={true} showNavbar={true} showFooter={true}>
     <div className="container">
     <h2>This is Profile Page</h2>
     </div>
    </Layout>
  );
};

export default Profile;
