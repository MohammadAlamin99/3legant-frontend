import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Map({
  customIcon,
  position,
}: {
  customIcon: L.Icon;
  position: [number, number];
}) {
  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "450px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup>
            <strong>Your Location</strong> <br /> Dhaka, Bangladesh 🇧🇩
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
