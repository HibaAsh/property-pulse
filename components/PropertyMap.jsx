"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import pin from "@/assets/images/pin.svg"

import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: pin.src,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

const Map = ({ lat, lng, address }) => {
  const position = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={customIcon}>
        <Popup>
          {address.street}, {address.city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
