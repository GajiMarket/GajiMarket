import React, { useState, useEffect } from "react";
import useMap from '../../hooks/ejk/useMap.ej';
import { IPathResponse, getPathFinder } from "../../api/pathFinder.api";
import { mapMarker, mapRoute } from "../../utils/mapUtils";

const MapComponent: React.FC = () => {
    const map = useMap();
    const [pathData, setPathData] = useState<{ coordinates: [number, number][]} | null>(null);

    // useEffect(() => {
    //     if (map) {
    //         console.log('Map initialized:', map);
    //     }
    // }, [map]);

    useEffect(() => {
        const getPathData = async () => {
            try {
                const data = await getPathFinder();
                const coordinates = data.features
                    .filter((feature) => feature.geometry.type === 'Point')
                    .map((feature) => feature.geometry.coordinates);
                if (coordinates.length > 0) {
                    setPathData({ coordinates });
                } else {
                    console.warn('No coordinates found in path data');
                }
            } catch (error) {
                console.error('Failed to fetch path data:', error);
            }
        };

        getPathData();
    }, []);

    useEffect(() => {
        if (map && pathData) {
            mapMarker(map, pathData.coordinates[0], 'green');
            mapMarker(map, pathData.coordinates[pathData.coordinates.length - 1], 'red');
            mapRoute(map, pathData);
        }
    }, [map, pathData]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}/>
}

export default MapComponent;