// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      {/* Display user-specific information */}
    </div>
  );
}

export default Dashboard;
