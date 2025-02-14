// src/App.tsx
import 'leaflet/dist/leaflet.css';
import React from 'react';
import MapComponent from './MapComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Dena'ina Place Names</h1>
      <MapComponent />
    </div>
  );
};

export default App;