// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">DeFi Health</h2>
      <ul className="nav-links">
        <li><Link to="/submit-record">Submit Health Record</Link></li>
        <li><Link to="/audit-trail">Audit Trail Dashboard</Link></li>
        <li><Link to="/deployed-records">Deployed Health Record Contracts</Link></li>
        <li><Link to="/login">Login/Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
