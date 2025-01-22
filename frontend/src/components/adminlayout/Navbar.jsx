// src/components/Navbar.jsx
import React, { useState } from "react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Clear token or perform logout actions
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <nav className="navbarr">
      {/* <div className="navbar-left">
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="profile-container" onClick={toggleDropdown}>
          {}
          <img
            src="https://www.w3schools.com/howto/img_avatar.png" 
            alt="Profile"
            className="profile-img"
          />
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
