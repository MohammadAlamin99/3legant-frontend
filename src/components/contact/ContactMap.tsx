"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Icon } from "leaflet";

const Map = dynamic(() => import("./Map"), { ssr: false });

const ContactMap: React.FC = () => {
  const [customIcon, setCustomIcon] = useState<Icon | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      setCustomIcon(icon);
    });
  }, []);

  if (!customIcon) return null;

  const position: [number, number] = [23.642916703521273, 90.487981159607];
  return (
    <div className="rounded-md overflow-hidden shadow-md">
      <Map customIcon={customIcon} position={position} />
    </div>
  );
};

export default ContactMap;
