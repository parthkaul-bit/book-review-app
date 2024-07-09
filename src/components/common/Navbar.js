import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" sx={{ m: 0 }}>
        <Toolbar>
          <Typography variant="h6">
            Bookshala
          </Typography>
          {authState && authState.token ? (
            <>
              <Button component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
