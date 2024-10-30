// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Proposals.css';

function Proposals({ userId, role }) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await api.get(`/proposals/user/${userId}`);
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, [userId]);

  return (
    <div className="proposals-container">
      <h3>Proposals</h3>
      {proposals.length > 0 ? (
        <ul className="proposal-list">
          {proposals.map((proposal, index) => (
            <li key={index} className="proposal-item">
              <p><strong>Project:</strong> {proposal.projectTitle}</p>
              <p><strong>Status:</strong> {proposal.status}</p>
              <p><strong>Submitted on:</strong> {new Date(proposal.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals submitted yet.</p>
      )}
    </div>
  );
}

export default Proposals;
