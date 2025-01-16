import { useEffect, RefObject} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig} from '../../config/mapConfig';
import productStroe from '../../utils/productStore';

const {mapInstance, setMapInstance} = productStroe();

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


export const detailMap = (mapContainerRef: RefObject<HTMLDivElement>, config: typeof mapConfig) => {
// const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

    useEffect(() => {
        if(!mapContainerRef.current || mapInstance) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: config.defaultStyle,
            center: config.initialCenter,
            zoom: config.initialZoom,
        });

        const language = new MapboxLanguage({ defaultLanguage: config.defaultLanguage});
        map.addControl(language);

       setMapInstance?.(map);

       return () => {
        map.remove();
       };
        
    }, [mapContainerRef, config]);

    const updateCenter = (longitude: number, latitude: number) => {
        mapInstance?.flyTo({center: [longitude, latitude], essential: true});
    };

    return { mapInstance, updateCenter};
};
