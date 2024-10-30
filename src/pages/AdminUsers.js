import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'freelancer' });
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await api.get('/admin/users');
    setUsers(response.data);
  };

  const handleCreateUser = async () => {
    await api.post('/admin/users', newUser);
    fetchUsers();
    setNewUser({ name: '', email: '', password: '', role: 'freelancer' });
  };

  const handleEditUser = async (userId) => {
    await api.put(`/admin/users/${userId}`, editData);
    setEditUserId(null);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    await api.delete(`/admin/users/${userId}`);
    fetchUsers();
  };

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            {editUserId === user._id ? (
              <>
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                <input type="text" value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} />
                <button onClick={() => handleEditUser(user._id)}>Save</button>
              </>
            ) : (
              <>
                <p>{user.name} ({user.role})</p>
                <button onClick={() => { setEditUserId(user._id); setEditData(user); }}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="create-user">
        <h3>Create New User</h3>
        <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
}

export default AdminUsers;
