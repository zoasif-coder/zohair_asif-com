import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Changed to HashRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './landing_page';
import MapCard from './MapCard';
import csvFile from './assets/coords/locations.csv';
import WebsiteHeader from './header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <WebsiteHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapCard csvFile={csvFile} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();