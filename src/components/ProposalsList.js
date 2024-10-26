// src/components/ProposalsList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function ProposalsList({ projectId }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await api.get(`/proposals/project/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProposals(response.data);
      } catch (err) {
        setError('Failed to load proposals.');
      }
    };

    fetchProposals();
  }, [projectId]);

  return (
    <div>
      <h3>Submitted Proposals</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {proposals.length > 0 ? (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal._id}>
              <p><strong>Freelancer:</strong> {proposal.freelancer.name} ({proposal.freelancer.email})</p>
              <p><strong>Budget:</strong> ${proposal.budget}</p>
              <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals submitted for this project.</p>
      )}
    </div>
  );
}

export default ProposalsList;
