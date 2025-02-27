import React, {useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DenainaLocation } from "../types";
import denainaLocationsMockData from '../data/denainaLocationsMock.json'; 

const MapComponent: React.FC = () => {
  const [denainaLocationsMock] = useState<DenainaLocation[]>(denainaLocationsMockData as DenainaLocation[]);
  
  return (
    <MapContainer center={[61.2176, -149.8997]} zoom={9} minZoom={7} style={{height: '80vh', width: '100vw' }} maxBounds={[[58.78879, -153.63653], [62.77450, -146.17683]]} maxBoundsViscosity={0.5}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {denainaLocationsMock.map((location) => (
        <Marker
          key={location.id}
          position={location.coordinates}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
          }}
        >
          <Popup>{location.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
