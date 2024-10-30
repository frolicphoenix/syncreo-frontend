// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import { fetchClientProposals, fetchFreelancerProposals } from '../services/api';
import './Proposals.css';

function Proposals({ userId, role }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        let response; // Define response variable here

        if (role === 'client') {
          response = await fetchClientProposals();
        } else if (role === 'freelancer') {
          response = await fetchFreelancerProposals();
        }

        setProposals(response.data);
        console.log('Proposals fetched:', response.data); // Log fetched proposals
      } catch (err) {
        console.error('Error fetching proposals:', err); // Log detailed error
        setError('Failed to fetch proposals. Please try again later.');
      }
    };

    fetchProposals();
  }, [role]);

  return (
    <div className="proposals-page">
      <h2>{role === 'client' ? 'Proposals Received' : 'Proposals Sent'}</h2>
      {error && <p className="error-message">{error}</p>}
      {proposals.length > 0 ? (
        <ul className="proposal-list">
          {proposals.map((proposal) => (
            <li key={proposal._id} className="proposal-item">
              <p><strong>Project:</strong> {proposal.project.title}</p>
              {role === 'freelancer' && (
                <>
                  <p><strong>Budget:</strong> ${proposal.budget}</p>
                  <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
                </>
              )}
              {role === 'client' && (
                <>
                  <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
                  <p><strong>Email:</strong> {proposal.freelancer.email}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals {role === 'client' ? 'received' : 'sent'} yet.</p>
      )}
    </div>
  );
}

export default Proposals;
