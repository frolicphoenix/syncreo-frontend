// src/components/freelancers/FreelancerCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function FreelancerCard() {
  return (
    <Card>
      <CardActionArea component={Link} to="/freelancers/1">
        <CardMedia
          component="img"
          alt="Freelancer"
          height="140"
          image="https://source.unsplash.com/random/200x200?face"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Freelancer Name
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Skills: JavaScript, React, Node.js
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FreelancerCard;
