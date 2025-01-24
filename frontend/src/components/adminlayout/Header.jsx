// src/components/Header.jsx
import React, { useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';  // Bell icon
import { FiLogOut } from 'react-icons/fi'; // Logout icon

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  // Handle logout
  const handleLogout = () => {
    // Handle your logout logic here (e.g., clear token, user session, etc.)
    localStorage.removeItem('token'); // Clear token
    window.location.href = '/login';  // Redirect to login page after logout
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>My App</h1>
      </div>
      <div className="header-right">
        {/* Bell Notification Icon */}
        <div className="notification-icon">
          <AiOutlineBell size={25} />
        </div>

        {/* Profile Image with Dropdown */}
        <div className="profile-container" onClick={toggleDropdown}>
          <img
            src="https://www.w3schools.com/howto/img_avatar.png" // Replace with actual profile image URL
            alt="Profile"
            className="profile-img"
          />
        </div>

        {/* Dropdown menu for profile */}
        {showDropdown && (
          <div className="dropdown-menu">
            <button className="logout-button" onClick={handleLogout}>
              <FiLogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
