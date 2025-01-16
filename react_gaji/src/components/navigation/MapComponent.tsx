import React, { useEffect } from "react";
import useMap from '../../hooks/ejk/useMap.ej';
import { usePathData } from "../../hooks/ejk/useNavitation";
import { mapMarker, mapRoute, processCoordinates } from "../../utils/mapUtils";

const MapComponent: React.FC = () => {
    const map = useMap();
    const { pathData, loading, error } = usePathData(); // useNavigation return 변수 받기

    useEffect(() => {
        if (loading || error || !map || !pathData) return;

        // 경로 좌표가 features 형태로 제공될 경우 처리리
        const coordinates = pathData.coordinates || processCoordinates(pathData.features);

        if (coordinates.length > 0) {
            // start와 end에 마커 추가
            mapMarker(map, coordinates[0]); // start
            mapMarker(map, coordinates[coordinates.length - 1]); // end

            // 경로 이어주기
            mapRoute(map, { coordinates });
        }
    }, [map, pathData, loading, error]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}/>
}

export default MapComponent;