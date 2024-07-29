// VerticalNavBar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import BookingsIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const VerticalNavBar = () => {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard/recent">
        <ListItemIcon><BookingsIcon /></ListItemIcon>
        <ListItemText primary="Recent Bookings" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/favorites">
        <ListItemIcon><FavoriteIcon /></ListItemIcon>
        <ListItemText primary="Favorite Spots" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/account">
        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
        <ListItemText primary="Account Details" />
      </ListItem>
      
    </List>
  );
};

export default VerticalNavBar;
