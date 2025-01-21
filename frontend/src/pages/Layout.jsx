// src/components/Layout.jsx
import React from 'react';
import Header from '../components/adminlayout/Header';
import Sidebar from '../components/adminlayout/Sidebar';
import Footer from '../components/adminlayout/Footer';
import Navbar from '../components/adminlayout/Navbar';

const Layout = ({ children, showSidebar, showNavbar, showFooter }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <Header />
      </header>
      {showNavbar && (
        <nav className="layout-navbar">
          <Navbar />
        </nav>
      )}
      <div className="layout-body">
        {showSidebar && (
          <aside className="layout-sidebar">
            <Sidebar />
          </aside>
        )}
        <main className="layout-content">{children}</main>
      </div>
      {showFooter && (
        <footer className="layout-footer">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
