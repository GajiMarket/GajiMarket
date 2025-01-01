import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN, mapConfig } from "../../config/mapConfig"

mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapConfig {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  style: string;
  initialCenter: [number, number];
  initialZoom: number;
  defaultLanguage: string;
  config: mapConfig;
}

const useMap = ({ mapContainerRef, style, config}: MapConfig) => {

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: config.defaultStyle,
      center: config.initialCenter,
      zoom: config.initialZoom,
      attributionControl: config.attributionControl,
    });
    
    const language = new MapboxLanguage({
      defaultLanguage: config.defaultLanguage,
    });
    map.addControl(language)
    mapContainerRef.current = map;

    // 언마운트시 내용 전부 리셋
    map.remove();
}, [mapContainerRef, style, config])};

export default useMap;