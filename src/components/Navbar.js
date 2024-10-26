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
      <h1 className="logo">Syncreo</h1>
      <div className="nav-links">
        {/* <Link to="/" className="nav-link">Dashboard</Link> */}
        {user ? (
          <>
            <span className="greeting">Hi, {user.name}</span>
            <Link to="/profile" className="nav-link profile-link">
              <img
                src={user.profilePicture || '/default-profile.png'}
                alt="Profile"
                className="profile-pic"
              />
            </Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
