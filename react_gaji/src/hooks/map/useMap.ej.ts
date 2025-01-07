import { useEffect, useRef } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
// import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { MAPBOX_TOKEN } from "../../config/mapConfig"
// import { mapMarker } from "../../utils/mapUtils";

mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapConfig {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  style: string;
  initialCenter: [number, number];
  initialZoom: number;
  defaultLanguage: string;
  markers?: Array<{ coords: [number, number]; color: string}>;
  path?: number[][];
  // onClick?: (lngLat: mapboxgl.LngLat) => void; // 클릭 핸들러 콜백 추가
}

const useMap = ({ mapContainerRef, style, initialCenter, initialZoom, markers= [], path= []}: MapConfig) => {

  // const clickMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const layerIds = useRef<string[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style,
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false
    });
    // mapMarker(map, initialCenter);

    // const language = new MapboxLanguage({
    //   defaultLanguage: defaultLanguage,
    // });
    // map.addControl(language)
    mapRef.current = map;

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
      // console.log(lngLat) // 클릭좌표 콘솔에 찍힘

      if (onClick) {
        onClick(lngLat);
      }
      // console.log(lngLat); // 클릭좌표 콘솔출력
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
}, [mapContainerRef, style, initialCenter, initialZoom, defaultLanguage, onClick])};

export default useMap;