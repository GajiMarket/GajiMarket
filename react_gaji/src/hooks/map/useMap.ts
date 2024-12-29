import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN, mapConfig } from "../../config/mapConfig"
import { mapMarker } from "../../utils/mapUtils";

mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapConfig {
  initialCenter: [number, number];
  initialZoom: number;
  defaultLanguage: string;
}

const useMap = ({ mapContainerRef, style, config}: MapConfig) => {
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: style,
      center: config.initialCenter,
      zoom: config.initialZoom,
      attributionControl: false,
    });
    mapMarker(map, config.initialCenter);
    
    const language = new MapboxLanguage({
      defaultLanguage: config.defaultLanguage,
  
    });
    map.addControl(language)

    return () => map.remove();
}, [mapContainerRef, style, config])};

export default useMap;