// src/pages/AdminUsers.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users'); // Make sure this route exists on your backend
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    await api.delete(`/admin/users/${userId}`);
    fetchUsers(); // Refresh the list after deletion
  };

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <p>{user.name} - {user.email}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;
