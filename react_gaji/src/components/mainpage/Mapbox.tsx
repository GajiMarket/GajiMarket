import React, { useEffect, useRef } from "react";
import useMap from "../../hooks/map/useMap";
import { mapConfig } from "../../config/mapConfig";
import { mapMarker } from "../../utils/mapUtils";
import "../../style/Mapbox.css";

const Mapbox:React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { map } = useMap({
        mapContainerRef,
        config: mapConfig,
    });

    useEffect(() => {
        if (!map) return;
        mapMarker(map, mapConfig.initialCenter);
    }, [map])

    return (
        <div 
            ref={mapContainerRef}
            className="Mapbox_Googlemap"
        />
    );
}

export default Mapbox;