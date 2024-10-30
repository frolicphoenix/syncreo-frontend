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
        let response;
        if (role === 'freelancer') {
          // Fetch submitted proposals by freelancer
          response = await api.get(`/proposals/freelancer/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        } else if (role === 'client') {
          // Fetch received proposals for client's projects
          response = await api.get(`/proposals/client/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        }
        setProposals(response.data);
      } catch (err) {
        console.error('Error fetching proposals:', err);
        setError('Failed to load proposals.');
      }
    };

    fetchProposals();
  }, [userId, role]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="proposals-container">
      <h3>{role === 'freelancer' ? 'Submitted Proposals' : 'Received Proposals'}</h3>
      {proposals.length > 0 ? (
        <ul className="proposal-list">
          {proposals.map((proposal) => (
            <li key={proposal._id} className="proposal-item">
              <p><strong>Project:</strong> {proposal.project.title}</p>
              <p><strong>Budget:</strong> ${proposal.budget}</p>
              <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
              <p><strong>Status:</strong> {proposal.status}</p>
              <p><strong>Submitted on:</strong> {new Date(proposal.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals {role === 'freelancer' ? 'submitted' : 'received'} yet.</p>
      )}
    </div>
  );
}

export default Proposals;
