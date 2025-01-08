import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig } from "../config/mapConfig";

declare global {
    interface ImportMetaEnv {
        VITE_MAPBOX_ACCESS_TOKEN: string; // 환경 변수로 Mapbox 액세스 토큰 관리
    }
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; // 환경 변수에서 액세스 토큰 가져오기


const useMap = (
    mapContainerRef: React.RefObject<HTMLDivElement>, // Mapbox 지도를 렌더링할 DOM 요소의 참조
    style: string, // 지도 스타일 URL
    config: mapConfig // 초기 설정값 (중심 좌표, 줌 레벨 등)
) => {
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null); // Mapbox 인스턴스 상태
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null); // Marker 상태 관리

    // 지도 초기화 및 설정
    useEffect(() => {
        if (!mapContainerRef.current) return; // DOM 요소가 없으면 아무것도 하지 않음
    
        const map = new mapboxgl.Map({
            container: mapContainerRef.current, // 렌더링할 DOM 요소
            style, // 지도 스타일
            center: config.initialCenter, // 초기 중심 좌표
            zoom: config.initialZoom, // 초기 줌 레벨
        });
        
         // 다국어 지원 플러그인 추가
        const language = new MapboxLanguage({
            defaultLanguage: config.defaultLanguage, // 설정된 기본 언어
        });
        map.addControl(language);  // 언어 설정 컨트롤을 지도에 추가
    
        setMapInstance(map); // Mapbox 인스턴스를 상태에 저장
    
        // 마커 추가
        const newMarker = new mapboxgl.Marker()
            .setLngLat(config.initialCenter) // 초기 중심 좌표에 마커 설정
            .addTo(map); // 마커를 지도에 추가
        setMarker(newMarker); // 마커 인스턴스를 상태에 저장
    
        return () => {
            map.remove(); // 컴포넌트가 언마운트되면 지도 제거
        };
    }, [mapContainerRef, style, config.initialCenter]); // 의존성 배열에 따라 실행
    
    // 위치 업데이트 함수
    const updateLocation = (longitude: number, latitude: number) => {
        if (mapInstance && marker) {
            marker.setLngLat([longitude, latitude]); // 마커 위치 업데이트
            mapInstance.flyTo({ center: [longitude, latitude], essential: true }); // 지도 중심 이동
        }
    };

    return { updateLocation }; // 위치 업데이트 함수를 반환
};


export default useMap;