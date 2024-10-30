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
import AdminDetailView from './pages/admin/AdminDetailView';
import ViewUser from './pages/admin/ViewUser';
import ViewProject from './pages/admin/ViewProject';

function App() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const adminToken = localStorage.getItem('adminToken');

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin route - redirects to /admin/login if no token */}
          <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/details/:type/:id" element={adminToken ? <AdminDetailView /> : <Navigate to="/admin/login" />} />

          {/* Other public routes or redirect for unknown paths */}
          <Route path="*" element={<Navigate to="/admin/login" />} />
          <Route path="/admin/users/:id" element={<ViewUser />} />
          <Route path="/admin/projects/:id" element={<ViewProject />} />
          
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
