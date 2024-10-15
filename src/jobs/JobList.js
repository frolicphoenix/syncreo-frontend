// src/components/jobs/JobList.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import JobCard from './JobCard';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default JobList;
