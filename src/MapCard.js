import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

const MapCard = ({ csvFile }) => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch(csvFile)
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const coords = results.data
              .filter(row => row.latitude !== undefined && row.longitude !== undefined)
              .map(row => ({
                lat: row.latitude,
                lng: row.longitude,
                date: row.date,
                time: row.time
              }))
              .filter(coord => !isNaN(coord.lat) && !isNaN(coord.lng)); // Filter out invalid coordinates
            setCoordinates(coords);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, [csvFile]);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '90vh', width: 'calc(100% - 20px)', margin: '10px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.length > 0 && (
        <>
          <Polyline positions={coordinates.map(coord => [coord.lat, coord.lng])} color="blue" dashArray="5, 10" />
          {coordinates.map((coord, index) => (
            <CircleMarker
              key={index}
              center={[coord.lat, coord.lng]}
              radius={index === coordinates.length - 1 ? 10 : 5}
              color={index === coordinates.length - 1 ? 'red' : 'blue'}
            >
              <Tooltip>
                <span>{`Date: ${coord.date}, Time: ${coord.time}`}</span>
              </Tooltip>
            </CircleMarker>
          ))}
        </>
      )}
    </MapContainer>
  );
};

export default MapCard;