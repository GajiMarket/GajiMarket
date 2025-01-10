import React from "react";
import useMapbox from "../../hooks/ejk/useMapProduct";

interface ClickMapProps {
  onLocationClick: (lngLat: mapboxgl.LngLat) => void;
}

const ClickMap: React.FC<ClickMapProps> = ({ onLocationClick }) => {
  useMapbox(onLocationClick);
  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default ClickMap;