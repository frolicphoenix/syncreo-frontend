// src/components/jobs/PostJob.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      setError('Failed to post the job.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Post a New Job
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={onSubmit}>
        {/* Title */}
        <TextField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={onChange}
          fullWidth
          required
          margin="normal"
        />
        {/* Description */}
        <TextField
          label="Job Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          fullWidth
          multiline
          rows={4}
          required
          margin="normal"
        />
        {/* Budget */}
        <TextField
          label="Budget"
          name="budget"
          value={formData.budget}
          onChange={onChange}
          fullWidth
          required
          margin="normal"
        />
        {/* Submit Button */}
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Post Job
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default PostJob;
