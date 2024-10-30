// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Proposals.css';

function Proposals({ userId, role }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Check if user is a client to fetch proposals
        if (role === 'client') {
          const response = await api.get('/proposals/client', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setProposals(response.data);
        }
      } catch (err) {
        console.error('Error fetching client proposals:', err);
        setError('Failed to fetch proposals. Please try again later.');
      }
    };

    fetchProposals();
  }, [role]);

  return (
    <div className="proposals-page">
      <h2>Proposals Received</h2>
      {error && <p className="error-message">{error}</p>}
      {proposals.length > 0 ? (
        <ul className="proposal-list">
          {proposals.map((proposal) => (
            <li key={proposal._id} className="proposal-item">
              <p><strong>Project:</strong> {proposal.project.title}</p>
              <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
              <p><strong>Email:</strong> {proposal.freelancer.email}</p>
              <p><strong>Budget:</strong> ${proposal.budget}</p>
              <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals received yet.</p>
      )}
    </div>
  );
}

export default Proposals;
