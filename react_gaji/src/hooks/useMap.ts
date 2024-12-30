import { useEffect } from "react";
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig } from "../config/mapConfig";

declare global {
    interface ImportMetaEnv {
        VITE_MAPBOX_ACCESS_TOKEN: string;
    }
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const useMap = (mapContainerRef: React.RefObject<HTMLDivElement>, style:string, config:mapConfig) => {
    useEffect(() => {
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

        return () => map.remove();
    }, [mapContainerRef, style, config]);
};
export default useMap;
