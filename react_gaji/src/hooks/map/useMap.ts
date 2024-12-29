import { useEffect, RefObject } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import type { mapConfig } from "../../config/mapConfig";
import useLocation from "../../hooks/useLocation";

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
    // 현재 위치 받아오기
    const { location, error } = useLocation();
    
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style,
            // center: config.initialCenter,
            center: location ? [location.lng, location.lat] : config.initialCenter,
            zoom: config.initialZoom,
            attributionControl: false, // 맵박스 기본 컨트롤러 삭제
        });

        const language = new MapboxLanguage({
            defaultLanguage: config.dafaultLanguage,
        });

        map.addControl(language);

        return () => map.remove();
    }, [mapContainerRef, style, config])
};

export default useMap;