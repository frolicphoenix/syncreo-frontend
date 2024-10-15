// src/pages/HomePage.js
import React from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import FreelancerCard from '../components/freelancers/FreelancerCard';
import JobCard from '../components/jobs/JobCard';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Find the perfect freelancer for your project
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Connect with talented freelancers and get your work done efficiently.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/register">
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Placeholder for an image or illustration */}
          <CardMedia
            component="img"
            image="https://source.unsplash.com/random"
            alt="Freelancing"
            sx={{ height: 300 }}
          />
        </Grid>
      </Grid>

      {/* Featured Freelancers */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
        Featured Freelancers
      </Typography>
      <Grid container spacing={4}>
        {/* Map through featured freelancers and render FreelancerCard components */}
        {[1, 2, 3, 4].map((id) => (
          <Grid item xs={12} sm={6} md={3} key={id}>
            <FreelancerCard />
          </Grid>
        ))}
      </Grid>

      {/* Latest Jobs */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
        Latest Jobs
      </Typography>
      <Grid container spacing={4}>
        {/* Map through latest jobs and render JobCard components */}
        {[1, 2, 3, 4].map((id) => (
          <Grid item xs={12} sm={6} md={3} key={id}>
            <JobCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
