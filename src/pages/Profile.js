// src/pages/Profile.js
import React from 'react';
import './Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {user ? (
        <div className="profile-details">
          <img
            src={user.profilePicture || '/default-profile.png'}
            alt="Profile"
            className="profile-image"
          />
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className="no-user">User not logged in.</p>
      )}
    </div>
  );
}

export default Profile;
