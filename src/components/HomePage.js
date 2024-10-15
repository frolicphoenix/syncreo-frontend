// src/pages/HomePage.js
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ServicesSection from './home/ServicesSection';
import CarouselSection from '../components/home/CarouselSection';

function HomePage() {
  return (
    <>
    <Box
      sx={{
        position: 'relative',
        color: '#fff',
        py: 10,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        },
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900?workspace)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        py: 10,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Find the Perfect Freelance Services for Your Business
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
          Connect with talented freelancers and get your projects done quickly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/select-role"
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
    <ServicesSection />
    <CarouselSection />
    </>
  );
}

export default HomePage;
