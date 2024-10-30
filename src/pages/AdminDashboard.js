// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import AdminUsers from './AdminUsers';
import AdminProjects from './AdminProjects';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
          Users
        </button>
        <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? 'active' : ''}>
          Projects
        </button>
      </div>
      <div className="content">
        {activeTab === 'users' ? <AdminUsers /> : <AdminProjects />}
      </div>
    </div>
  );
}

export default AdminDashboard;
