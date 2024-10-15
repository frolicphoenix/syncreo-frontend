// src/components/profile/EditProfile.js
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

function EditProfile() {
  const [formData, setFormData] = useState({
    profession: '',
    bio: '',
    skills: [],
    skillInput: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile/me');
        setFormData({
          profession: res.data.profession || '',
          bio: res.data.bio || '',
          skills: res.data.skills || [],
          skillInput: '',
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserProfile();
  }, []);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/profile/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Update user avatar URL
      setFormData({ ...formData, avatarUrl: res.data.avatarUrl });
    } catch (err) {
      console.error(err);
      setError('Failed to upload avatar.');
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (formData.skillInput && !formData.skills.includes(formData.skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skillInput],
        skillInput: '',
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/profile', {
        profession: formData.profession,
        bio: formData.bio,
        skills: formData.skills,
      });
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating your profile.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Edit Your Profile
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={onSubmit}>
        {/* Profile Picture Upload */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Profile Picture
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <label htmlFor="avatar-upload">
              <Input
                accept="image/*"
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={uploadAvatar}
              sx={{ ml: 2 }}
              disabled={!avatarFile}
            >
              Upload
            </Button>
          </Box>
        </Box>
        {/* Profession */}
        <TextField
          label="Profession"
          name="profession"
          value={formData.profession}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        {/* Bio */}
        <TextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={onChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        {/* Skills */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Skills
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TextField
              label="Add a skill"
              name="skillInput"
              value={formData.skillInput}
              onChange={onChange}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={addSkill}>Add</Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            {formData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => removeSkill(skill)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Box>
        {/* Submit Button */}
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EditProfile;
