// src/components/jobs/JobCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function JobCard() {
  return (
    <Card>
      <CardActionArea component={Link} to={`/jobs/${job._id}`}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {job.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Budget: ${job.budget}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Skills Required: {job.skillsRequired.join(', ')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default JobCard;
