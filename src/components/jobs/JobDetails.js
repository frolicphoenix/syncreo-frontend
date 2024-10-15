// src/components/jobs/JobDetails.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Chip, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details from API
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4">{job.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Budget: ${job.budget}
      </Typography>
      <Box mt={2}>
        <Typography variant="h6">Description:</Typography>
        <Typography variant="body1">{job.description}</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Skills Required:</Typography>
        <Box>
          {job.skillsRequired.map((skill) => (
            <Chip key={skill} label={skill} sx={{ mr: 1, mt: 1 }} />
          ))}
        </Box>
      </Box>
      {/* Apply Button */}
      <Box mt={4}>
        <Button variant="contained" color="primary">
          Apply for this Job
        </Button>
      </Box>
    </Container>
  );
}

export default JobDetails;
