import { useEffect, useState } from "react";
import { Map } from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig } from "./mapConfig";

const useMapbox = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new Map(mapConfig);

      const language = new MapboxLanguage({ defaultLanguage: mapConfig.defaultLanguage });
      mapInstance.addControl(language);

      setMap(mapInstance);
    };

    if (!map) initializeMap();

    return () => {
      if (map) map.remove();
    }
  }, [map]);

  return map;
}

export default useMapbox;