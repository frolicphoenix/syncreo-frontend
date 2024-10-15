// src/components/layout/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

function Navbar() {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
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
            <div>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
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
                <MenuItem component={RouterLink} to="/dashboard" onClick={handleClose}>
                  Dashboard
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
