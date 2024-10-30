// src/pages/admin/AdminUsers.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    await api.delete(`/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
    fetchUsers();
  };

  const handleViewUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <p>{user.name} - {user.email}</p>
            <div>
              <button onClick={() => handleViewUser(user._id)}>View</button>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;
