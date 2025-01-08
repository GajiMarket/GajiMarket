import { useEffect, useState, RefObject } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig } from "../config/mapConfig";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const useMap = (mapContainerRef: RefObject<HTMLDivElement>, config: typeof mapConfig) => {
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

    // 지도 초기화
    useEffect(() => {
        if (!mapContainerRef.current || mapInstance) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: config.defaultStyle,
            center: config.initialCenter,
            zoom: config.initialZoom,
        });

        // 다국어 지원 추가
        const language = new MapboxLanguage({ defaultLanguage: config.defaultLanguage });
        map.addControl(language);

        setMapInstance(map);

        return () => {
            map.remove(); // 컴포넌트 언마운트 시 지도 제거
        };
    }, [mapContainerRef, config]);

    // 지도 중심 이동 함수
    const updateCenter = (longitude: number, latitude: number) => {
        mapInstance?.flyTo({ center: [longitude, latitude], essential: true });
    };

    return { mapInstance, updateCenter };
};

export default useMap;
