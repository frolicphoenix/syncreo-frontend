// src/components/freelancers/FreelancerProfile.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Avatar, Grid, Chip, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FreelancerProfile() {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    // Fetch freelancer data from API
    const fetchFreelancer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/freelancers/${id}`);
        setFreelancer(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFreelancer();
  }, [id]);

  if (!freelancer) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 100, height: 100 }} src={freelancer.avatarUrl} />
        <Box ml={2}>
          <Typography variant="h4">{freelancer.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {freelancer.profession}
          </Typography>
        </Box>
      </Box>
      {/* Skills */}
      <Box mt={2}>
        <Typography variant="h6">Skills:</Typography>
        <Box>
          {freelancer.skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ mr: 1, mt: 1 }} />
          ))}
        </Box>
      </Box>
      {/* Bio */}
      <Box mt={2}>
        <Typography variant="h6">About Me:</Typography>
        <Typography variant="body1">{freelancer.bio}</Typography>
      </Box>
      {/* Portfolio */}
      <Box mt={2}>
        <Typography variant="h6">Portfolio:</Typography>
        <Grid container spacing={2}>
          {freelancer.portfolio.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%' }} />
              <Typography variant="subtitle1">{item.title}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default FreelancerProfile;
