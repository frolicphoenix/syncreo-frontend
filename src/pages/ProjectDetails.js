// src/pages/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
// import MessageList from '../components/MessageList';
import './ProjectDetails.css';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ budget: '', coverLetter: '' });

  const user = JSON.parse(localStorage.getItem('user'));
  const isFreelancer = user?.role === 'freelancer';
  const isClient = user?.role === 'client';

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await api.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProject(projectResponse.data);
  
        console.log("Project Data:", projectResponse.data);
        console.log("User ID:", user._id);
        console.log("Project Client ID:", projectResponse.data.client._id);
  
        if (isClient && projectResponse.data.client._id === user._id) {
          const proposalsResponse = await api.get(`/proposals/project/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setProposals(proposalsResponse.data);
          console.log("Proposals:", proposalsResponse.data);
        }
      } catch (error) {
        setError('Failed to load project details.');
      }
    };
  
    fetchProjectData();
  }, [id, isClient, user]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="project-details-page">
      {project ? (
        <div className="project-details-card">
          <h2 className="project-title">{project.title}</h2>
          <p className="project-description">{project.description}</p>
          <p className="project-info">Budget: ${project.budget}</p>
          <p className="project-info">Posted by: {project.client.name}</p>

          {/* Freelancer View: Proposal Submission Form */}
          {isFreelancer && (
            <div className="proposal-form">
              <h3>Submit a Proposal</h3>
              <form onSubmit={handleSubmitProposal}>
                <div className="form-group">
                  <label>Budget</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Submit Proposal</button>
              </form>
            </div>
          )}

          {/* Client View: List of Submitted Proposals */}
          {isClient && proposals.length > 0 ? (
            <div className="proposals-list">
              <h3>Submitted Proposals</h3>
              <ul>
                {proposals.map((proposal) => (
                  <li key={proposal._id} className="proposal-card">
                    <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
                    <p><strong>Budget:</strong> ${proposal.budget}</p>
                    <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : isClient && project?.client?._id === user?._id && (
            <p className="no-proposals">No proposals submitted yet.</p>
          )}

          {/* Messaging Component */}
          {/* <MessageList projectId={id} /> */}

        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default ProjectDetails;
