// src/pages/ClientProfile.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ClientProfile.css';

function ClientProfile() {
  const [user, setUser] = useState(null);
  const [postedProjects, setPostedProjects] = useState([]);
  const [receivedProposals, setReceivedProposals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve user from localStorage and set it to state
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      console.log('Retrieved user:', storedUser); // Log user data
    } else {
      console.error("User data not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch projects and proposals only if user data is available
        if (user && user._id) {
          const projectsResponse = await api.get('/projects/client', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setPostedProjects(projectsResponse.data);

          const proposalsResponse = await api.get('/proposals/client/received', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setReceivedProposals(proposalsResponse.data);
        }
      } catch (err) {
        setError('Failed to load client profile data.');
        console.error('Error fetching client data:', err);
      }
    };

    fetchClientData();
  }, [user]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

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
