// src/components/Layout.jsx
import React from "react";
import Header from "../components/adminlayout/Header";
import Sidebar from "../components/adminlayout/Sidebar";
import Footer from "../components/adminlayout/Footer";
import Navbar from "../components/adminlayout/Navbar";

const Layout = ({ children, showHeader = true, showSidebar = true, showNavbar = true, showFooter = true }) => {
  return (
    <div className="layout-container flex flex-col min-h-screen">
      {showHeader && <Header />}
      {showNavbar && <Navbar />}

      <div className="layout-body flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="layout-content flex-1 p-4">{children}</main>
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
