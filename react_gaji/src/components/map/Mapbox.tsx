import { useRef } from "react";
import useMap from '../../hooks/ejk/useMap.ej'
import useLocation from "../../hooks/useLocation";
import { mapConfig } from "../../config/mapConfig";

const clickMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { location } = useLocation();

    useMap({
        mapContainerRef,
        style: mapConfig.defaultStyle,
        config: {
            ...mapConfig,
            initialCenter: location 
                ? [location.lng, location.lat]
                : mapConfig.initialCenter
        }
    });

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
};

export default clickMap;