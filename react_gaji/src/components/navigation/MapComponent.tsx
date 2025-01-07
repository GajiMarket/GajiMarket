import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import useMap from "../../hooks/map/useMap.ej";
import { mapConfig } from "../../config/mapConfig";
import { getPathFinder } from "../../api/pathFinder.api";

const MapComponent: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [pathCoordinates, setPathCoordinates] = useState<number[][]>([]);

    useMap({
        mapContainerRef,
        style: mapConfig.defaultStyle,
        initialCenter: mapConfig.initialCenter,
        initialZoom: mapConfig.initialZoom,
        defaultLanguage: 'ko',
        onClick: (lngLat) => {
            // console.log("Clicked coordinates:", lngLat);
        }
    });

    return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh"}} />;
}

export default MapComponent;
