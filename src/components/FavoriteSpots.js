import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const FavoriteSpots = () => {
  const [favoriteSpots, setFavoriteSpots] = useState([]);

  useEffect(() => {
    fetchFavoriteSpots();
  }, []);

  const fetchFavoriteSpots = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/auth/favorite-spots', {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
      setFavoriteSpots(response.data.favoriteSpots);
    } catch (error) {
      console.error('Error fetching favorite spots:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Favorite Spots
      </Typography>
      <List>
        {favoriteSpots.map((spot, index) => (
          <ListItem key={index}>
            <ListItemText primary={spot} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoriteSpots;
