// src/components/layout/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
    // Optionally, reset Axios auth header
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo or Brand Name */}
        <Typography variant="h6" component={Link} to="/" style={{ color: '#fff', textDecoration: 'none', flexGrow: 1 }}>
          Freelancing App
        </Typography>

        {/* Navigation Links */}
        {isAuthenticated ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
