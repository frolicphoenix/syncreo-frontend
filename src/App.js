import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {user?.role === 'admin' ? (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
            </>
          ) : (
            <Route path="/admin/*" element={<Navigate to="/" />} /> // Redirect non-admin users
          )}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
