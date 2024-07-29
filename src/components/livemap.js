// LiveMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icon issues with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const parkingSpaces = [
  { id: 1, lat: 40.712776, lng: -74.005974, name: "Parking Lot 1" },
  { id: 2, lat: 40.713776, lng: -74.015974, name: "Parking Lot 2" },
 
];

const LiveMap = () => {
  return (
    <MapContainer center={[40.712776, -74.005974]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {parkingSpaces.map(space => (
        <Marker key={space.id} position={[space.lat, space.lng]}>
          <Popup>{space.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LiveMap;
