// src/components/home/ServicesSection.js
import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

const services = [
  {
    title: 'Graphic Design',
    imageUrl: 'https://source.unsplash.com/random/400x400?design',
  },
  {
    title: 'Web Development',
    imageUrl: 'https://source.unsplash.com/random/400x400?code',
  },
  {
    title: 'Digital Marketing',
    imageUrl: 'https://source.unsplash.com/random/400x400?marketing',
  },
  {
    title: 'Writing & Translation',
    imageUrl: 'https://source.unsplash.com/random/400x400?writing',
  },
];

function ServicesSection() {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
          Explore Our Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.imageUrl}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ServicesSection;
