import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig } from "../config/mapConfig";

declare global {
    interface ImportMetaEnv {
        VITE_MAPBOX_ACCESS_TOKEN: string;
    }
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const useMap = (mapContainerRef: React.RefObject<HTMLDivElement>, style: string, config: mapConfig) => {
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;
    
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style,
            center: config.initialCenter,
            zoom: config.initialZoom,
        });
    
        setMapInstance(map);
    
        const newMarker = new mapboxgl.Marker()
            .setLngLat(config.initialCenter)
            .addTo(map);
        setMarker(newMarker);
    
        return () => {
            map.remove(); // 기존 맵 정리
        };
    }, [mapContainerRef, style, config.initialCenter]);
    
    useEffect(() => {
        if (mapInstance && marker) {
            marker.setLngLat(config.initialCenter);
            mapInstance.flyTo({ center: config.initialCenter, essential: true });
        }
    }, [config.initialCenter]);


    const initializeMap = () => {
        if (!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style,
            center: config.initialCenter,
            zoom: config.initialZoom,
        });

        const language = new MapboxLanguage({
            defaultLanguage: config.defaultLanguage,
        });
        map.addControl(language);

        setMapInstance(map);

        const newMarker = new mapboxgl.Marker()
            .setLngLat(config.initialCenter)
            .addTo(map);
        setMarker(newMarker);

        return () => {
            map.remove();
        };
    };

    const updateLocation = (longitude: number, latitude: number) => {
        if (mapInstance && marker) {
            marker.setLngLat([longitude, latitude]);
            mapInstance.flyTo({ center: [longitude, latitude], essential: true });
        }
    };

    return { updateLocation, initializeMap };
};


export default useMap;