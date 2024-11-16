// src/35mm.js
import React, { useState } from 'react';
import './App.css';
import { MapPinIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

const importAll = (r) => r.keys().map(r);
const photos = importAll(require.context('./assets/35mm', false, /\.(png|jpe?g|svg)$/));

const ThirtyFiveMM = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const getPhotoInfo = (filename) => {
    const match = filename.match(/(\d{2})_(\d{2})_(\d{4})_([^_]+)_([^.]+)\./);
    if (match) {
      const [_, day, month, year, city, country] = match;
      return {
        date: new Date(`${year}-${month}-${day}`),
        city,
        country
      };
    }
    return { 
      date: new Date(0),
      city: 'Unknown', 
      country: 'Unknown' 
    };
  };

  const sortedPhotos = [...photos].sort((a, b) => {
    const dateA = getPhotoInfo(a).date;
    const dateB = getPhotoInfo(b).date;
    return dateB - dateA;
  });

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? sortedPhotos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === sortedPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FFFAF0] px-10 py-10">
      {/* Background blobs */}
      <div className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 bg-[#004225]/20 w-96 h-96 top-0 -left-4" />
      <div className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 bg-[#004225]/20 w-96 h-96 top-48 -right-4 animation-delay-2000" />
      <div className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 bg-[#004225]/20 w-96 h-96 bottom-24 left-1/2 animation-delay-4000" />

      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative flex items-center justify-center max-w-4xl mx-auto" 
              onClick={e => e.stopPropagation()}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(false);
                  }}
                  className="absolute -top-4 -right-4 text-white hover:text-gray-300 z-50"
                >
                  <X size={24} />
                </button>
                
                <button 
                  onClick={handlePrevious}
                  className="absolute left-[-60px] top-[50%] -translate-y-1/2 text-white hover:text-gray-300 p-2"
                >
                  <ChevronLeft size={40} />
                </button>
      
                <button 
                  onClick={handleNext}
                  className="absolute right-[-60px] top-[50%] -translate-y-1/2 text-white hover:text-gray-300 p-2"
                >
                  <ChevronRight size={40} />
                </button>
      
                <img
                  src={sortedPhotos[currentPhotoIndex]}
                  alt="Full size"
                  className="max-h-[60vh] max-w-[50vw] w-auto object-contain rounded-lg"
                />
              </div>
              <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4 text-[#004225]" />
                <span className="text-sm font-medium text-[#004225]">
                  {getPhotoInfo(sortedPhotos[currentPhotoIndex]).city}, 
                  {getPhotoInfo(sortedPhotos[currentPhotoIndex]).country}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingTop: '75px' }}>
        <h1 className="text-4xl font-bold text-center text-[#004225] mb-6">35mm love</h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center text-gray-600 p-6">
            A collection of moments caught no 35mm film. Mainly using a Traveler AF Zoom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedPhotos.map((photo, index) => {
            const info = getPhotoInfo(photo);
            return (
              <div 
                key={index}
                className="relative group cursor-pointer"
                onClick={() => {
                  setCurrentPhotoIndex(index);
                  setModalOpen(true);
                }}
              >
                <img
                  src={photo}
                  alt={`Photo from ${info.city}, ${info.country}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4 text-[#004225]" />
                  <span className="text-sm font-medium text-[#004225]">
                    {info.city}, {info.country}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThirtyFiveMM;