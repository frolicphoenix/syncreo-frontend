// src/components/layout/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Freelancing App. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
