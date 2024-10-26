// src/pages/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

import MessageList from '../components/MessageList';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ budget: '', coverLetter: '' });

  // Get user data from localStorage to determine role
  const user = JSON.parse(localStorage.getItem('user'));
  const isFreelancer = user?.role === 'freelancer';
  const isClient = user?.role === 'client';

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch project details
        const projectResponse = await api.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProject(projectResponse.data);

        // If client, fetch proposals for the project
        if (isClient) {
          const proposalsResponse = await api.get(`/proposals/project/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setProposals(proposalsResponse.data);
        }
      } catch (error) {
        setError('Failed to load project details.');
      }
    };

    fetchProjectData();
  }, [id, isClient]);

  // Handle form input change for freelancers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle proposal submission for freelancers
  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/proposals',
        { projectId: id, budget: formData.budget, coverLetter: formData.coverLetter },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setFormData({ budget: '', coverLetter: '' });
      alert('Proposal submitted successfully!');
    } catch {
      alert('Failed to submit proposal.');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {project ? (
        <>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Budget: ${project.budget}</p>
          <p>Posted by: {project.client.name}</p>

          {/* Messaging Component */}
          <MessageList projectId={id} />

          {/* Freelancer View: Proposal Submission Form */}
          {isFreelancer && (
            <div>
              <h3>Submit a Proposal</h3>
              <form onSubmit={handleSubmitProposal}>
                <div>
                  <label>Budget</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit">Submit Proposal</button>
              </form>
            </div>
          )}

          {/* Client View: List of Submitted Proposals */}
          {isClient && proposals.length > 0 ? (
            <div>
              <h3>Submitted Proposals</h3>
              <ul>
                {proposals.map((proposal) => (
                  <li key={proposal._id}>
                    <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
                    <p><strong>Budget:</strong> ${proposal.budget}</p>
                    <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : isClient ? (
            <p>No proposals submitted yet.</p>
          ) : null}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProjectDetails;
