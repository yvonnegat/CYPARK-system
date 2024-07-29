import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;


const RoutingMachine = ({ routeStart, routeEnd }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !routeStart || !routeEnd) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(routeStart[0], routeStart[1]),
        L.latLng(routeEnd[0], routeEnd[1])
      ],
      routeWhileDragging: true,
      serviceUrl: 'https://router.project-osrm.org/route/v1' // OSRM demo server
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, routeStart, routeEnd]);

  return null;
};


const MapContainer = ({ parkingSpots, routeStart, routeEnd, searchedLocation }) => {
  const defaultPosition = searchedLocation ? [searchedLocation.latitude, searchedLocation.longitude] : [-1.286389, 36.817223];

  return (
    <LeafletMap center={defaultPosition} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkingSpots && parkingSpots.map(spot => (
        <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
          <Popup>
            <div>
              <h4>{spot.name}</h4>
              <p>Availability: {spot.availability}</p>
              <p>Price: ${spot.price}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      
      <RoutingMachine routeStart={routeStart} routeEnd={routeEnd} />
    </LeafletMap>
  );
};

export default MapContainer;
