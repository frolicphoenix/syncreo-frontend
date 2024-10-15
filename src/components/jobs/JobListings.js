// src/components/jobs/JobListings.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [budgetRange, setBudgetRange] = useState([0, 10000]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);

        // Extract unique categories from the job list
        const uniqueCategories = [...new Set(res.data.map((job) => job.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBudgetChange = (event, newValue) => {
    setBudgetRange(newValue);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? job.category === category : true) &&
      job.budget >= budgetRange[0] &&
      job.budget <= budgetRange[1]
    );
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Job Listings
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          {/* Search Field */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Search Jobs"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
            />
          </Grid>

          {/* Category Select */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Budget Range Slider */}
          <Grid item xs={12} md={4}>
            <Typography id="budget-slider" gutterBottom>
              Budget Range (${budgetRange[0]} - ${budgetRange[1]})
            </Typography>
            <Slider
              value={budgetRange}
              onChange={handleBudgetChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              marks={[
                { value: 0, label: '$0' },
                { value: 2500, label: '$2.5k' },
                { value: 5000, label: '$5k' },
                { value: 7500, label: '$7.5k' },
                { value: 10000, label: '$10k' },
              ]}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Job Listings */}
      <Grid container spacing={4}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {job.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Category:</strong> {job.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Budget:</strong> ${job.budget}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/jobs/${job._id}`}
                    size="small"
                    color="primary"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No jobs found matching your criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default JobListings;
