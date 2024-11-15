import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './landingpage';
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