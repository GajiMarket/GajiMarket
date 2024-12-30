import React, { useRef } from "react";
import useMap from "../../hooks/useMap";
import { mapConfig } from "../../config/mapConfig";
import "../../style/Mapbox.css";

const Mapbox:React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    useMap(mapContainerRef, mapConfig.defaultStyle, mapConfig);

    return (
        <div 
            ref={mapContainerRef}
            className="Mapbox_Googlemap"
        />
    );
}

export default Mapbox;