import 'leaflet/dist/leaflet.css';
import React from 'react';
import MapComponent from './components/MapComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Dena'ina Place Names</h1>
      <MapComponent />
    </div>
  );
};

export default App;