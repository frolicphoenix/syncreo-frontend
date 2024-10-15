// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data and other dashboard information
    const fetchDashboardData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/api/auth/user');
        setUser(userRes.data);

        // Fetch recent activity (placeholder data for now)
        const activityRes = await axios.get('http://localhost:5000/api/activity/recent');
        setRecentActivity(activityRes.data);

        // Fetch messages (placeholder data for now)
        const messagesRes = await axios.get('http://localhost:5000/api/messages');
        setMessages(messagesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Welcome Message */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Welcome back, {user.name}!
      </Typography>

      <Grid container spacing={4}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Recent Activity
              </Typography>
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                    {activity.description}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">No recent activity.</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button component={Link} to="/activity" size="small" color="primary">
                View All Activity
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Messages */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Messages
              </Typography>
              {messages.length > 0 ? (
                messages.slice(0, 3).map((message, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                    From: {message.senderName} - {message.content.substring(0, 50)}...
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">No new messages.</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button component={Link} to="/messages" size="small" color="primary">
                Go to Messages
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Quick Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    component={Link}
                    to="/profile"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    component={Link}
                    to="/jobs"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Browse Jobs
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    component={Link}
                    to="/post-job"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Post a Job
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    component={Link}
                    to="/settings"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Account Settings
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

