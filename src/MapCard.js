import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

const FloatingBlob = ({ className }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 ${className}`} />
);

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
    <div className="min-h-screen relative overflow-hidden bg-[#FFFAF0] px-10">
      {/* Animated background blobs */}
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 top-0 -left-4" />
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 top-48 -right-4 animation-delay-2000" />
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 bottom-24 left-1/2 animation-delay-4000" />
      <div style={{ paddingTop: '75px' }}>
        <h1 className="text-2xl font-bold text-center px-5%">Find My Mapper</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto my-6">
          Basically, I thought I had lost my airpods in my home and coudlndt find them as their location wouldnt update. 
          Fast forward 3 months and they had randomly come online one day, running around zurich. Before I got the chance to intecept them they started trotting the globe. 
          Sadly Apple does not let you track location history of a device in the 'Find My' app. So I set up a script to scrape their location from the 'Find My' app and this is the result.
          Enjoy following my airpods as they live a warmer life.
        </p>
        <div className="flex justify-center">
          <MapContainer center={[0, 0]} zoom={2} style={{height: '75vh', width: '85%', margin: '10px' }}>
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
        </div>
      </div>
    </div>
  );
};

export default MapCard;