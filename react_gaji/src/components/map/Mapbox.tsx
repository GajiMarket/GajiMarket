import React, { useRef } from "react";
import useMap from "../../hooks/map/useMap";
import { mapConfig } from "../../config/mapConfig";

const Mapbox:React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useMap({
        mapContainerRef: mapContainer,
        style: mapConfig.defaultStyle,
        config: mapConfig
    });

    return (
        <div 
            ref={mapContainer}
            style={{ width: '100%', height: '100vh'}}
        />
    );
}

export default Mapbox;