import React, { useRef } from "react";
import useMap from "../../hooks/map/useMap";
import { mapConfig } from "../../config/mapConfig";
import useLocation from "../../hooks/useLocation";
import "../../style/Mapbox.css";

const Mapbox:React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { location, error, loading } = useLocation();

    useMap({
        mapContainerRef,
        style: mapConfig.defaultStyle,
        // mapConfig
        config: {
            ...mapConfig,
            initialCenter: location 
                ? [location.lng, location.lat]
                : mapConfig.initialCenter
        }
    });

    return (
        <div 
            ref={mapContainerRef}
            className="Mapbox_Googlemap"
        />
    );
}

export default Mapbox;