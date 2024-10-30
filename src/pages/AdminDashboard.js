import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-nav">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/projects">Manage Projects</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
