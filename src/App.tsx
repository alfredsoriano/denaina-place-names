import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import MapComponent from "./components/MapComponent";
import NavigationBar from "./components/NavigationBar";

const App: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <NavigationBar />
      <MapComponent />
    </div>
  );
};

export default App;
