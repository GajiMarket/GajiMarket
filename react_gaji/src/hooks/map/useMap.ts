import { useEffect, RefObject, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import type { mapConfig } from "../../config/mapConfig";

// env 타입선언 후 사용하기
declare global {
    interface ImportMetaEnv {
        VITE_MAPBOX_ACCESS_TOKEN: string;
    }
}
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// mapbox 타입 선언
type useMapProps = {
    mapContainerRef: RefObject<HTMLDivElement>;
    style: string;
    config: mapConfig;
    currentLocation?: { lat: number, lng: number } | null;
};

//// mapbox 사용하기 ////
const useMap = ({ mapContainerRef, style, config, currentLocation }: useMapProps): void => {
    const mapInstance = useRef<mapboxgl.Map | null>(null);
  
    useEffect(() => {
      if (!mapContainerRef.current) return;
      
      // 맵이 아직 생성되지 않았을 때만 새로 생성
      if (!mapInstance.current) {
        mapInstance.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style,
          center: currentLocation ? [currentLocation.lng, currentLocation.lat] : config.initialCenter,
          zoom: config.initialZoom,
          attributionControl: false,
        });
  
        const language = new MapboxLanguage({
          defaultLanguage: config.defaultLanguage,
        });
        
        mapInstance.current.addControl(language);
      }
  
      // 위치가 변경될 때마다 맵 이동
      if (mapInstance.current && currentLocation) {
        mapInstance.current.flyTo({
          center: [currentLocation.lng, currentLocation.lat],
          zoom: config.initialZoom,
          duration: 2000  // 애니메이션 시간 (ms)
        });
      }
  
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }, [mapContainerRef, style, config, currentLocation]);
  };

export default useMap;