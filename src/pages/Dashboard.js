// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function Dashboard() {
  const [data, setData] = useState([]); // Holds either projects or freelancers
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const isFreelancer = user?.role === 'freelancer';
  const isClient = user?.role === 'client';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = isFreelancer ? '/projects' : '/freelancers';
        const response = await api.get(endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please log in.');
      }
    };

    fetchData();
  }, [isFreelancer, isClient]);

  return (
    <div>
      <h2>Dashboard</h2>
      {isFreelancer && <SearchBar searchType="projects" />}
      {isClient && <SearchBar searchType="freelancers" />}
      
      {isFreelancer && <h2>Available Projects</h2>}
      {isClient && <h2>Available Freelancers</h2>}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item._id}>
              {isFreelancer ? (
                <>
                  <Link to={`/projects/${item._id}`}>{item.title}</Link>
                  <p>{item.description}</p>
                  <p>Budget: ${item.budget}</p>
                </>
              ) : (
                <>
                  <Link to={`/freelancers/${item._id}`}>{item.name}</Link>
                  <p>Bio: {item.bio}</p>
                  <p>Skills: {item.skills.join(', ')}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No {isFreelancer ? 'projects' : 'freelancers'} available.</p>
      )}
    </div>
  );
}

export default Dashboard;
