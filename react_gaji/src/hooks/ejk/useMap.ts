import { useEffect, useState, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig } from "../../hooks/ejk/mapConfig";

const useMapbox = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const clickMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new Map(mapConfig);

      const language = new MapboxLanguage({ defaultLanguage: mapConfig.defaultLanguage });
      mapInstance.addControl(language);

      // 클릭 이벤트 핸들러 정의
      const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
        const { lngLat } = e;
        if (clickMarkerRef.current) {
          clickMarkerRef.current.remove();
        }

        clickMarkerRef.current = new mapboxgl.Marker({
          color: "#dc2626",
          draggable: false,
        })
          .setLngLat(lngLat)
          .addTo(mapInstance);

        console.log(lngLat);
      };

      // 클릭 이벤트 연결
      mapInstance.on("click", handleMapClick);

      setMap(mapInstance);
    };

    if (!map) initializeMap();

    return () => {
      if (clickMarkerRef.current) {
        clickMarkerRef.current.remove();
      }
      if (map) map.remove();
    };
  }, [map]);

  return map;
};

export default useMapbox;