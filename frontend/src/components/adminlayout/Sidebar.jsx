// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active links
import '../../../src/styles/sidebar.css'; // Import the CSS for sidebar styling
import { AiOutlineDashboard } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { SiPuma } from "react-icons/si";
import { FaUser } from "react-icons/fa";


const Sidebar = () => {
  return (
     <aside className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlineDashboard /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FiSettings/> Settings
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user"
            className={location.pathname.startsWith("/user") || location.pathname.startsWith("/create-user") ? "active" : ""}
          >
            <FaUser/> User
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SiPuma/> Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
