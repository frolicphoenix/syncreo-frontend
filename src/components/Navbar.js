// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('user'); // Remove user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SYNCREO</Link>
      <div className="nav-links">
        
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <span className="greeting">Hi, {user.name}</span>
            <Link to="/profile" className="nav-link profile-link">
              <img
                src={user.profilePicture || '/prof.png'}
                alt="Profile"
                className="profile-pic"
              />
            </Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
