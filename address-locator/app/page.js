"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div>
      <Map position={[10.3099, 123.893]} zoom={15} />
    </div>
  );
}

export default HomePage;
