// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import { fetchProposalsForFreelancer, fetchProposalsForClient } from '../services/api';
import './Proposals.css';

function Proposals({ userId, role }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId || !role) {
      console.error("User ID or role is missing");
      setError('User data is incomplete. Please log in again.');
      return;
    }

    const getProposals = async () => {
      try {
        let response;
        if (role === 'freelancer') {
          response = await fetchProposalsForFreelancer(userId);
        } else if (role === 'client') {
          response = await fetchProposalsForClient(userId);
        }
        setProposals(response.data);
      } catch (err) {
        console.error('Error fetching proposals:', err);
        setError('Failed to load proposals.');
      }
    };

    getProposals();
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
              <p><strong>Submitted on:</strong> {new Date(proposal.createdAt).toLocaleString()}</p>
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
