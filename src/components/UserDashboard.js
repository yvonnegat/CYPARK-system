import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Drawer, CssBaseline, Toolbar, AppBar, IconButton, useMediaQuery } from '@mui/material';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RecentBookings from '../components/RecentBookings';
import FavoriteSpots from '../components/FavoriteSpots';
import AccountDetails from '../components/AccountDetails';
import VerticalNavBar from '../components/VerticalnavBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import "../App.css";
import { useAuth } from '../AuthContext';

const drawerWidth = 240;

const UserDashboard = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const getInitials = (email) => {
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return '';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            User Dashboard
          </Typography>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && user && (
            <Typography variant="h6" noWrap sx={{ ml: 'auto', mr: 2 }}>
              Welcome, {getInitials(user.email)}
            </Typography>
          )}

          {!isMobile && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate('/account')}
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <VerticalNavBar />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<WelcomeMessage />} />
          <Route path="recent" element={<RecentBookings />} />
          <Route path="favorites" element={<FavoriteSpots />} />
          <Route path="account" element={<AccountDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
};

const WelcomeMessage = () => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://webbylab.com/wp-content/uploads/2023/03/1-1.png" 
        alt="Reservation"
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Need a Reservation?
        </Typography>
        <Typography variant="body1" paragraph>
          It looks like you don't have any upcoming reservations. Book now to secure your spot!
        </Typography>
        
        <Typography variant="body2" paragraph>
          - Up to 50% off drive-up rates
        </Typography>
        <Typography variant="body2" paragraph>
          - Advanced booking
        </Typography>
        <Typography variant="body2" paragraph>
          - Clear directions
        </Typography>
        <Typography variant="body2" paragraph>
          - A mobile pass you can access on your phone
        </Typography>
        <Typography variant="body2" paragraph>
          - An automated receipt
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => navigate('/parkingmap')} 
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDashboard;
