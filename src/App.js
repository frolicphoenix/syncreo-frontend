import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="/" element={<Dashboard />} />
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
