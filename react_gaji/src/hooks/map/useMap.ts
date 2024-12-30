import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN, mapConfig } from "../../config/mapConfig"
import { mapMarker, mapPopup } from "../../utils/mapUtils";

mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapConfig {
  initialCenter: [number, number];
  initialZoom: number;
  defaultLanguage: string;
}

const useMap = ({ mapContainerRef, style, config}: MapConfig) => {
  const clickMarkerRef = useRef<mapboxgl.Marker>(null);

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

    // 클릭 이벤트 핸들러
    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const { lngLat } = e;
      // 기존 클릭 마커가 있다면 삭제
      if (clickMarkerRef.current) {
        clickMarkerRef.current.remove();
      }
      // 클릭시 새로운 마커 생성
      clickMarkerRef.current = new mapboxgl.Marker({
        color: '#dc2626',
        draggable: false,
      })
      .setLngLat(lngLat)
      .addTo(map)
      console.log(lngLat)
    };
    // 맵이 완전히 로딩 될 때 마커가 찍히도록 설정
    map.on('load', () => {
      map.on('click', handleMapClick);
    });
    // 언마운트시 내용 전부 리셋
    return () => {
      if (clickMarkerRef.current) {
        clickMarkerRef.current.remove();
      }
      map.remove();
    }
}, [mapContainerRef, style, config])};

export default useMap;