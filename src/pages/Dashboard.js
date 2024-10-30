// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState([]); // Holds all projects
  const [filteredData, setFilteredData] = useState([]); // Holds filtered results
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const isFreelancer = user?.role === 'freelancer';
  const isClient = user?.role === 'client';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all projects for both freelancers and clients
        const response = await api.get('/projects', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data to show all projects initially
      } catch (err) {
        console.error("Error fetching data:", err); // Log the error for debugging
        setError('Failed to fetch data. Please log in.');
      }
    };

    fetchData();
  }, [isFreelancer, isClient]);

  const handleCreateProject = () => {
    navigate('/new-project');
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filteredResults);
  };

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Dashboard</h2>
      {isFreelancer && <SearchBar searchType="projects" onSearch={handleSearch} />}
      {isClient && (
        <>
          <SearchBar searchType="projects" onSearch={handleSearch} />
          <button className="create-project-button" onClick={handleCreateProject}>
            Create New Project
          </button>
        </>
      )}
      
      <h2 className="section-title">Available Projects</h2>
      {error && <p className="error-message">{error}</p>}
      
      {filteredData.length > 0 ? (
        <div className="card-grid">
          {filteredData.map((item) => (
            <div key={item._id} className="card">
              <Link to={`/projects/${item._id}`} className="card-title">{item.title}</Link>
              <p className="card-description">{item.description}</p>
              <p className="card-info">Budget: ${item.budget}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No projects available.</p>
      )}
    </div>
  );
}

export default Dashboard;
