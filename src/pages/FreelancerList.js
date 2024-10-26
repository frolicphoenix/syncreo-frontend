// src/pages/FreelancerList.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function FreelancerList() {
  const [freelancers, setFreelancers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await api.get('/freelancers');
        setFreelancers(response.data);
      } catch (err) {
        console.error('Error fetching freelancers', err);
      }
    };

    fetchFreelancers();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Available Freelancers</h2>
      <input
        type="text"
        placeholder="Search freelancers..."
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {filteredFreelancers.map((freelancer) => (
          <li key={freelancer._id}>
            <h3>{freelancer.name}</h3>
            <p>{freelancer.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FreelancerList;
