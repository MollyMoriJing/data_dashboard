import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🐕</span>
          <span className="logo-text">Pawsome</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </Link>
        
        <div className="nav-section">
          <h3 className="nav-section-title">Quick Stats</h3>
          <div className="nav-stats">
            <div className="stat-item">
              <span className="stat-icon">🎂</span>
              <span className="stat-text">Age Groups</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🏆</span>
              <span className="stat-text">Top Breeds</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📏</span>
              <span className="stat-text">Size Distribution</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">ℹ️</span>
              <span className="stat-text">About</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;