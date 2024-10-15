// src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import UserManagement from './UserManagement';
import JobManagement from './JobManagement';

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Users" />
        <Tab label="Jobs" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <UserManagement />}
        {tabValue === 1 && <JobManagement />}
      </Box>
    </Container>
  );
}

export default AdminDashboard;
