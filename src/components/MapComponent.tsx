import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DenainaLocation } from "../types"

const MapComponent: React.FC = () => {
  const denainaLocationsMock: DenainaLocation[] = [
    {
      id: '1',
      title: 'Point Woronzof',
      coordinates: [61.1897, -149.9981]
    },
    {
      id: '2',
      title: 'Campbell Creek',
      coordinates: [61.1524, -149.8831]
    }
  ]

  console.log(denainaLocationsMock)

  return (
    <MapContainer center={[61.2176, -149.8997]} zoom={13} style={{ height: '80vh', width: '100vw' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {denainaLocationsMock.map((location) => {
        return (
          <Marker
            key={location.id}
            position={location.coordinates}
            eventHandlers={{
              mouseover: (event) => {
                event.target.openPopup();
              },
              mouseout: (event) => {
                event.target.closePopup();
              }
            }}>
            <Popup>
              {location.title}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default MapComponent;