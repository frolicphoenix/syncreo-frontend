// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import { fetchClientProposals, fetchFreelancerProposals } from '../services/api'; // Import the new API function
import './Proposals.css';

function Proposals({ userId, role }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        if (role === 'client') {
          const response = await fetchClientProposals();
          setProposals(response.data);
        } else if (role === 'freelancer') {
          const response = await fetchFreelancerProposals();
          setProposals(response.data);
        }
        console.log('Proposals fetched:', response); // Log response
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
              {role === 'client' ? (
                <>
                  <p><strong>Project:</strong> {proposal.project.title}</p>
                  <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
                  <p><strong>Email:</strong> {proposal.freelancer.email}</p>
                </>
              ) : (
                <>
                  <p><strong>Project:</strong> {proposal.project.title}</p>
                  <p><strong>Budget:</strong> ${proposal.budget}</p>
                  <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
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
