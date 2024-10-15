// src/components/profile/ProfilePage.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Chip,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile/me');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {user.profession || 'Profession not specified'}
          </Typography>
        </Box>
      </Box>

      {/* Bio */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
        About Me
      </Typography>
      <Typography variant="body1">
        {user.bio || 'No bio available'}
      </Typography>

      {/* Skills */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 4 }}>
        Skills
      </Typography>
      <Box sx={{ mt: 1 }}>
        {user.skills && user.skills.length > 0 ? (
          user.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
          ))
        ) : (
          <Typography variant="body1">No skills added yet.</Typography>
        )}
      </Box>

      {/* Edit Profile Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/edit-profile"
        >
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
}

export default ProfilePage;
