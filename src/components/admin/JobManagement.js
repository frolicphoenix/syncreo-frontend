// src/components/admin/JobManagement.js
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

function JobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/admin/jobs', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/jobs/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Job Management
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.category}</TableCell>
              <TableCell>${job.budget}</TableCell>
              <TableCell align="right">
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
                {/* Add more actions like Edit if needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default JobManagement;
