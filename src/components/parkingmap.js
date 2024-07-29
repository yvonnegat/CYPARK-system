import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import ParkingSpot from './ParkingSpot';
import TopBar from './TopBar';
import Button from '@mui/material/Button';
import BottomTopBar from './BottomTopBar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import parkingSpotsData from './ParkingData';
import '../App.css';
import Footer from './Footer';
import { geocodeLocation } from './geocodingService';

const Parkingmap = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [routeStart, setRouteStart] = useState(null);
  const [routeEnd, setRouteEnd] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);

  useEffect(() => {
    setParkingSpots(parkingSpotsData);
  }, []);

  const handleSortByCheapest = () => {
    const sortedSpots = [...parkingSpots].sort((a, b) => a.price - b.price);
    setParkingSpots(sortedSpots);
  };

  const handleSortByNearest = (userLocation) => {
    const sortedSpots = [...parkingSpots].sort((a, b) => {
      const distanceA = Math.sqrt((a.latitude - userLocation.latitude) ** 2 + (a.longitude - userLocation.longitude) ** 2);
      const distanceB = Math.sqrt((b.latitude - userLocation.latitude) ** 2 + (b.longitude - userLocation.longitude) ** 2);
      return distanceA - distanceB;
    });
    setParkingSpots(sortedSpots);
  };

  const handleSearch = async (location) => {
    const coords = await geocodeLocation(location);
    if (coords) {
      handleSortByNearest(coords);
      setSearchedLocation(coords);
    }
  };

  const handleSetStart = (latitude, longitude) => {
    setRouteStart([latitude, longitude]);
  };

  const handleSetEnd = (latitude, longitude) => {
    setRouteEnd([latitude, longitude]);
  };

  return (
    <div className="app">
      <TopBar />
      <BottomTopBar onSearch={handleSearch} />
      <Container className="main-content">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} className="left-side">
            <Box className="sort-buttons">
              <Button variant="contained" onClick={handleSortByCheapest} fullWidth>Sort by Cheapest</Button>
              <Button variant="contained" onClick={() => handleSortByNearest({ latitude: 0, longitude: 0 })} fullWidth>Sort by Nearest</Button>
            </Box>
            <Box className="parking-spot-list">
              {parkingSpots.map(spot => (
                <ParkingSpot 
                  key={spot.id} 
                  spot={spot} 
                  setStart={handleSetStart} 
                  setEnd={handleSetEnd} 
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <MapContainer 
              parkingSpots={parkingSpots} 
              routeStart={routeStart} 
              routeEnd={routeEnd} 
              searchedLocation={searchedLocation} 
            />
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </div>
  );
};

export default Parkingmap;
