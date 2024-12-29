import { useRef } from "react";
import useMap from '../../hooks/map/useMap'
import useLocation from "../../hooks/useLocation";
import { mapConfig } from "../../config/mapConfig";

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { location, error, loading } = useLocation();

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
}

export default Map;