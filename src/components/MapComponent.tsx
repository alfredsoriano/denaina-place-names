import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DenainaLocation } from "../types";
import denainaLocationsMockData from "../data/denainaLocationsMock.json";
import FullScreenInfo from "./FullScreenInfo";
import L from "leaflet";

function MapComponent() {
  //pin handling
  const defaultPin = L.icon({
    iconUrl: "img/pins/marker-icon-2x.png",
    shadowUrl: "img/pins/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 40],
    popupAnchor: [0, -38],
    shadowAnchor: [12.5, 40],
  });

  const activePin = L.icon({
    iconUrl: "img/pins/Active_Marker.png",
    shadowUrl: "img/pins/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 40],
    popupAnchor: [0, -38],
    shadowAnchor: [12.5, 40],
  });

  //load default pin using default icon
  L.Marker.prototype.options.icon = defaultPin;

  const [denainaLocationsMock] = useState<DenainaLocation[]>(
    denainaLocationsMockData as DenainaLocation[]
  );
  const [currentLocation, setCurrentLocation] =
    useState<DenainaLocation | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState<boolean>(false);

  const [pinnedLocationId, setPinnedLocationId] = useState<string | null>(null);

  function onPinClick(location: DenainaLocation) {
    setCurrentLocation(location);
    setIsMainPopupOpen(true);
  }

  function onCloseMainPopup() {
    setCurrentLocation(null);
    setIsMainPopupOpen(false);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
      }}
    >
      <MapContainer
        center={[61.2176, -149.8997]}
        zoom={9}
        minZoom={7}
        style={{ height: "100vh", width: "100vw" }}
        maxBounds={[
          [57.05297, -156.43671], //bottom left coordinate point
          [64.03258, -145.85643], //top right coordinate point
        ]}
        maxBoundsViscosity={0.5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {denainaLocationsMock.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={pinnedLocationId === location.id ? activePin : defaultPin}
            eventHandlers={{
              mouseover: (event) => {
                if (!("ontouchstart" in window)) {
                  event.target.openPopup();
                }
              },
              mouseout: (event) => {
                if (!("ontouchstart" in window)) {
                  setTimeout(() => {
                    if (pinnedLocationId !== location.id) {
                      event.target.closePopup();
                    }
                  }, 200);
                }
              },
              click: (event) => {
                setPinnedLocationId(location.id);
                event.target.openPopup();
                onPinClick(location);
              },
            }}
          >
            <Popup>{location.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <FullScreenInfo
        location={currentLocation}
        isOpen={isMainPopupOpen}
        onClose={onCloseMainPopup}
      />
    </div>
  );
}

export default MapComponent;
