import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { MAPBOX_TOKEN, MapConfig } from "../../config/mapConfig"

mapboxgl.accessToken = MAPBOX_TOKEN;

interface UseMapProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  config: MapConfig;
}

const useMap = ({ mapContainerRef, config }: UseMapProps) => {

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // config에 있는 디폴트값 가져오기
    const {
      defaultStyle,
      initialCenter,
      initialZoom,
      defaultLanguage,
      attributionControl,
    } = config;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: defaultStyle,
      center: initialCenter,
      zoom: initialZoom,
      attributionControl,
    });

    if (defaultLanguage) {
      const languageControl = new MapboxLanguage({defaultLanguage})
      map.addControl(languageControl);
    }

    // 언마운트시 내용 전부 리셋
    return () => {
      map.remove();
    }
  }, [mapContainerRef, config])

};

export default useMap;