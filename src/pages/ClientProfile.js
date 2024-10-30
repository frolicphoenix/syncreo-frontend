// src/pages/ClientProfile.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ClientProfile.css';

function ClientProfile() {
  const [postedProjects, setPostedProjects] = useState([]);
  const [receivedProposals, setReceivedProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch projects posted by the client
        const projectsResponse = await api.get('/projects/client', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPostedProjects(projectsResponse.data);

        // Fetch received proposals for the client's projects
        const proposalsResponse = await api.get('/proposals/client/received', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReceivedProposals(proposalsResponse.data);
      } catch (err) {
        setError('Failed to load client profile data.');
        console.error('Error fetching client data:', err);
      }
    };

    fetchClientData();
  }, []);

  return (
    <div className="client-profile-page">
      <h2>My Profile</h2>

      {error && <p className="error-message">{error}</p>}

      <section>
        <h3>Projects I've Posted</h3>
        <ul>
          {postedProjects.map(project => (
            <li key={project._id}>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <p>Budget: ${project.budget}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Proposals Received</h3>
        <ul>
          {receivedProposals.map(proposal => (
            <li key={proposal._id}>
              <h4>{proposal.project.title}</h4>
              <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
              <p><strong>Budget:</strong> ${proposal.budget}</p>
              <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ClientProfile;
