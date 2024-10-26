// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Proposals.css';

function Proposals({ userId, role }) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const endpoint = role === 'freelancer' ? `/proposals/user/${userId}` : `/proposals/received/${userId}`;
        const response = await api.get(endpoint);
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
    fetchProposals();
  }, [userId, role]);

  return (
    <div className="proposals-section">
      <h3>Proposals</h3>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal._id}>
            <strong>Project:</strong> {proposal.project.title}
            <p>Budget: ${proposal.budget}</p>
            <p>Cover Letter: {proposal.coverLetter}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Proposals;
