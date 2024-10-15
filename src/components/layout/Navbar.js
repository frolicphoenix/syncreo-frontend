// src/components/layout/Navbar.js
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

function Navbar() {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
            }}
          >
            SYNCREO
          </Typography>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Dashboard Button */}
              <Button
                component={RouterLink}
                to="/dashboard"
                color="primary"
                sx={{ marginRight: 2 }}
              >
                Dashboard
              </Button>

              {/* Show Admin Link if user is admin */}
              {userRole === 'admin' && (
                <Button
                  component={RouterLink}
                  to="/admin"
                  color="primary"
                  sx={{ marginRight: 2 }}
                >
                  Admin Panel
                </Button>
              )}

              {/* Account Icon and Menu */}
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button component={RouterLink} to="/login" color="primary">
                Login
              </Button>
              <Button component={RouterLink} to="/register" color="primary">
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
