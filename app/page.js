"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { addRequestMeta } from "next/dist/server/request-meta";

function HomePage() {
  // state to get current location
  const [currLocation, setCurrLocation] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, []);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  // Function to handle map click and reverse geocode
  const handleMapClick = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
        setCurrLocation({
          lat,
          lng,
        });
      }
      console.log(currLocation, address);
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  return (
    <main className="relative w[100%]">
      <input
        style={{ width: "100%" }}
        value={address}
        onChange={(e) => e.target.value}
      ></input>
      <Map
        position={currLocation ? currLocation : [10.3099, 123.893]}
        zoom={15}
        onMapClick={handleMapClick}
        address={address}
      />
    </main>
  );
}

export default HomePage;
