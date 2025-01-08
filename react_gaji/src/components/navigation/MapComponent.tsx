import React, { useEffect } from "react";
import useMap from '../../hooks/ejk/useMap.ej';
import { usePathData } from "../../hooks/ejk/useNavitation";
import { mapMarker, mapRoute } from "../../utils/mapUtils";

const MapComponent: React.FC = () => {
    const map = useMap();
    const pathData = usePathData();

    useEffect(() => {
        if (map && pathData) {
            mapMarker(map, pathData.coordinates[0]);
            mapMarker(map, pathData.coordinates[pathData.coordinates.length - 1]);
            mapRoute(map, pathData);
        }
    }, [map, pathData]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}/>
}

export default MapComponent;