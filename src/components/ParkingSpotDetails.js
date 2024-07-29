import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card, CardMedia } from '@mui/material';
import TopBar from './TopBar';
import BottomTopBar from './BottomTopBar';
import Footer from './Footer';
import parkingSpots from './ParkingData'; 

const ParkingSpotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const spot = parkingSpots.find(spot => spot.id.toString() === id);

  if (!spot) {
    return <div>Parking spot not found</div>;
  }

  return (
    <div>
      <TopBar />
      <BottomTopBar />
      <Container maxWidth="md" sx={{ marginTop: 2, marginBottom: 2 }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={spot.image}
            alt="Parking Spot"
          />
        </Card>
        <section>
          <h2>{spot.name}</h2>
          <p>Status: <span style={{ color: spot.availability === 'Available' ? 'green' : 'red' }}>{spot.availability}</span></p>
          <p>Price: ${spot.price}/hour</p>
        </section>
        <section>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Check Availability</Button>
          <Button variant="contained" onClick={() => navigate('/reservation')} color="primary">Book Now</Button>
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default ParkingSpotDetails;
