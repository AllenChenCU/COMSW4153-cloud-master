import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './GoogleMap.css';

function GoogleMap({ routeData }) {
  const { legs } = routeData;
  const start = legs[0].start_location;
  const end = legs[0].end_location;
  const steps = legs[0].steps;

  const [initPos, setInitPos] = useState(null);

  useEffect(() => {
    if (start.lat && start.lng) {
      setInitPos([start.lat, start.lng]);
    }
  }, [start.lat, start.lng]);

  if (!initPos) {
    return <div>Loading map...</div>;
  }

  return (
    <div id="map">
      <MapContainer
        center={initPos}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[start.lat, start.lng]}>
          <Popup>Start: {routeData.legs[0].start_address}</Popup>
          <Tooltip>{routeData.legs[0].start_address}</Tooltip>
        </Marker>
        <Marker position={[end.lat, end.lng]}>
          <Popup>End: {routeData.legs[0].end_address}</Popup>
          <Tooltip>{routeData.legs[0].end_address}</Tooltip>
        </Marker>
        <Polyline
          positions={steps.map(step => [step.start_location.lat, step.start_location.lng])}
          color="blue"
          weight={3}
        />
      </MapContainer>
    </div>
  );
}

export default GoogleMap;
