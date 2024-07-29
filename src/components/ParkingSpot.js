import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'; 
import "../App.css";

const ParkingSpot = ({ spot, setStart, setEnd }) => {
  const navigate = useNavigate(); 

  if (!spot) {
    return null; 
  }

  
  const handleCardClick = () => {
    navigate(`/parking-spot/${spot.id}`); 
  };


  const handleBookNowClick = () => {
    navigate("/reservation");
  };

  const handleSetStart = (e) => {
    e.stopPropagation();
    setStart(spot.latitude, spot.longitude);
  };

  const handleSetEnd = (e) => {
    e.stopPropagation();
    setEnd(spot.latitude, spot.longitude);
  };

  return (
    <div className='parkingSpots'>
      <Card variant="outlined" sx={{ minWidth: 275, marginBottom: 2 }} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {spot.name} 
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Availability: {spot.availability} 
          </Typography>
          <Typography variant="body2">
            Price: ${spot.price}/hour 
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" onClick={handleBookNowClick}>
              Book Now
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSetStart}>
              Start
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleSetEnd}>
              End
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParkingSpot; 
