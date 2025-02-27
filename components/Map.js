"use client"; // Ensures it's a client-side component
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Maps = dynamic(() => import("@/components/Map"), { ssr: false });

// Custom component to set the map's view
const SetViewToCurrentLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, 15);
    }
  }, [location, map]);
  return null;
};

// Custom icon
const customIcon = L.icon({
  iconUrl: "/marker.png", // Path to your icon in the public folder
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [20, 40], // Position the icon properly
  popupAnchor: [0, -40], // Adjust popup position
});

const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={location || [51.505, -0.09]} // Default center (latitude, longitude)
      zoom={13}
      style={{ height: "100dvh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewToCurrentLocation location={location} />
      <Marker position={location || [51.505, -0.09]} icon={customIcon}>
        <Popup>Hello! This is a marker popup.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
