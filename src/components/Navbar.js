// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>Freelancing App</h1>
      <div>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
}

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: '#4CAF50',
};

const logoStyle = {
  color: '#fff',
};

const linkStyle = {
  marginLeft: '1rem',
  color: '#fff',
  textDecoration: 'none',
};

export default Navbar;
