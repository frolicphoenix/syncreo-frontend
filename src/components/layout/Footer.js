// src/components/layout/Footer.js
import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#3F3D56', color: '#fff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              SYNCREO
            </Typography>
            <Typography variant="body2" color="inherit">
              Connect with talented freelancers and clients seamlessly.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="none">
              About Us
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Careers
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Support
            </Typography>
            <Link href="#" color="inherit" underline="none">
              Help Center
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Terms of Service
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} SYNCREO. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
