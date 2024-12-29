import React, { useRef } from "react";
import useMap from "../../hooks/map/useMap";
import { mapConfig } from "../../config/mapConfig";
import useLocation from "../../hooks/useLocation";

const Mapbox:React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const { location } = useLocation();

    useMap({
        mapContainerRef: mapContainer,
        style: mapConfig.defaultStyle,
        config: mapConfig,
        currentLocation: location,
    });

    return (
        <div 
            ref={mapContainer}
            style={{ width: '100%', height: '100vh'}}
        />
    );
}

export default Mapbox;