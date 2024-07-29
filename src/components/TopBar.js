import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAuth } from '../AuthContext'; // Adjust import path as per your context file
import { styled } from '@mui/material/styles';

// Style for the text
const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 'bold',
  fontFamily:'sans-serif',
  fontSize: '35px',
  color: 'white',
}));

const UserInitials = styled('div')({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: '#3f51b5', 
  color: '#fff', 
  fontSize: '16px',
  fontWeight: 'bold',
});

const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleUser = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const getInitials = (email) => {
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return '';
  };

  // Handle case where user is not yet defined or loading
  if (user === undefined) {
    return null; // or render a loading indicator
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">
          Cypark 
        </StyledTypography>
        {user ? (
          <>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleUser}
              sx={{ ml: 2 }} // Margin left to space out from the logo and title
            >
              <UserInitials>{getInitials(user.email)}</UserInitials>
            </IconButton>
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/signin')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
