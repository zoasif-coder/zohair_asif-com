import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

const FloatingBlob = ({ className }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 ${className}`} />
);

const FlyToMarker = ({ coord }) => {
  const map = useMap();
  useEffect(() => {
    if (coord) {
      map.flyTo([coord.lat, coord.lng], 12, { duration: 1.5 });
    }
  }, [coord]);
  return null;
};

const MapCard = ({ csvFile }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
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
              .filter(coord => !isNaN(coord.lat) && !isNaN(coord.lng))
              .reverse();
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

  const selectedCoord = selectedIdx != null ? coordinates[selectedIdx] : null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FFFAF0] px-4 sm:px-10 pb-10">
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 top-0 -left-4" />
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 top-48 -right-4 animation-delay-2000" />
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 bottom-24 left-1/2 animation-delay-4000" />

      <div style={{ paddingTop: '75px' }}>
        <h1 className="text-2xl font-bold text-center">Find My Mapper</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto my-6">
          Basically, I thought I had lost my airpods in my home and coudlndt find them as their location wouldnt update. 
          Fast forward 3 months and they had randomly come online one day, running around zurich. Before I got the chance to intecept them they started trotting the globe. 
          Sadly Apple does not let you track location history of a device in the 'Find My' app. So I set up a script to scrape their location from the 'Find My' app and this is the result.
          Enjoy following my airpods as they live a warmer life.
        </p>

        <div className="flex flex-col lg:flex-row justify-center gap-6">
          {/* Map */}
          <div className="lg:w-2/3 w-full">
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '75vh', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {coordinates.length > 0 && (
                <>
                  <Polyline positions={coordinates.map(coord => [coord.lat, coord.lng])} color="blue" dashArray="5, 10" />
                  {coordinates.map((coord, index) => {
                    const isSelected = index === selectedIdx;
                    const isHovered = index === hoveredIdx;
                    const isLatest = index === coordinates.length - 1;

                    let color = 'blue';
                    if (isSelected) color = 'orange';
                    else if (isHovered) color = 'gold';
                    else if (isLatest) color = 'red';

                    return (
                      <CircleMarker
                        key={index}
                        center={[coord.lat, coord.lng]}
                        radius={isSelected || isHovered ? 10 : isLatest ? 10 : 5}
                        color={color}
                        eventHandlers={{
                          click: () => setSelectedIdx(index),
                          mouseover: () => setHoveredIdx(index),
                          mouseout: () => setHoveredIdx(null),
                        }}
                      >
                        <Tooltip>
                          <span>{`Date: ${coord.date}, Time: ${coord.time}`}</span>
                        </Tooltip>
                      </CircleMarker>
                    );
                  })}
                  <FlyToMarker coord={selectedCoord} />
                </>
              )}
            </MapContainer>
          </div>

          {/* Table */}
          <div className="lg:w-1/3 w-full max-h-[75vh] overflow-y-scroll bg-white border rounded shadow">
            <table className="table-auto w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 border-b text-xs">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Lat</th>
                  <th className="px-3 py-2 text-left">Lng</th>
                </tr>
              </thead>
              <tbody>
                {coordinates.map((coord, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer ${
                      idx === selectedIdx ? 'bg-yellow-200' :
                      idx === hoveredIdx ? 'bg-yellow-100' : ''
                    }`}
                    onClick={() => setSelectedIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <td className="px-3 py-2">{coord.date}</td>
                    <td className="px-3 py-2">{coord.time}</td>
                    <td className="px-3 py-2">{coord.lat.toFixed(4)}</td>
                    <td className="px-3 py-2">{coord.lng.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapCard;