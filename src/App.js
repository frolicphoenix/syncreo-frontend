import './App.css';

import PrivateRoute from './components/routing/PrivateRoute';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProfilePage from './components/profile/ProfilePage';
import EditProfile from './components/profile/EditProfile';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element=
          {
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
