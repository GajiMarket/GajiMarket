import React, { useRef } from "react";
import useMap from "../../hooks/useMap";
import "../../style/Mapbox.css";

interface MapboxProps {
  onLocationSelect?: (location: { lng: number; lat: number }) => void;
}

const Mapbox: React.FC<MapboxProps> = ({ onLocationSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useMap({
    mapContainerRef,
    style: "mapbox://styles/mapbox/streets-v11",
    config: {
      initialCenter: [126.9784, 37.5665], // 서울 좌표 (경도, 위도)
      initialZoom: 10,
      defaultLanguage: "ko",
    },
  });

  return <div ref={mapContainerRef} className="mapbox-container" />;
};

export default Mapbox;
