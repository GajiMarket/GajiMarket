import { useEffect } from "react";
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from "@mapbox/mapbox-gl-language";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const useMap = (mapContainerRef, style, config) => {
    
    useEffect(() => {
        if (!mapContainerRef.current) return;
    

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style : style,
            center : config.initialCenter,
            zoom : config.initialZoom,
        })

        const language = new MapboxLanguage({
            defaultLanguage : config.defaultLanguage,
        })
        map.addControl(language);

        return () => map.remove();
    },[mapContainerRef, style, config])
}
export default useMap;
