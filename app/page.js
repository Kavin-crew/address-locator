"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

function HomePage() {
  // state to get current location
  const [currLocation, setCurrLocation] = useState(null);

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
  return (
    <main className="relative w[100%]">
      <Map
        position={currLocation ? currLocation : [10.3099, 123.893]}
        zoom={15}
      />
    </main>
  );
}

export default HomePage;
