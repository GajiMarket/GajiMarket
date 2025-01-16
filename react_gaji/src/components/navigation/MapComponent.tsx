import React, { useEffect, useState } from "react";
import NaviPopup from "./NaviPopup";
import useMap from '../../hooks/ejk/useMap.ej';
import { usePathData } from "../../hooks/ejk/useNavitation";
import { mapMarker, mapRoute, processCoordinates } from "../../utils/mapUtils";
import { CustomProperties } from "../../api/pathFinder.api";

const MapComponent: React.FC = () => {
    const map = useMap();
    const { pathData, loading, error } = usePathData(); // useNavigation return 변수 받기
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState({ totalLength: 0, totalTime: 0 });

    useEffect(() => {
        if (loading || error || !map || !pathData) return;

        // 경로 좌표가 features 형태로 제공될 경우 coordinates 배열로 변환
        const features = pathData.features[0];
        const coordinates = pathData.coordinates || processCoordinates(pathData.features);
        if (!features) return;
        const { totalLength, totalTime } = features.properties as CustomProperties;

        if (coordinates.length > 0) {
            // start와 end에 마커 추가
            mapMarker(map, coordinates[0]); // start
            mapMarker(map, coordinates[coordinates.length - 1]); // end
            // 경로 이어주기
            mapRoute(map, { coordinates });

            // 경로 정보 pop에 렌더링
            setPopupData({ totalLength, totalTime });
            setPopupVisible(true);
        }
    }, [map, pathData, loading, error]);

    return (
        <>
            <div id="map" style={{ width: '100%', height: '100vh' }}/>
            {popupVisible && (
                <NaviPopup
                    totalLength={popupData.totalLength}
                    totalTime={popupData.totalTime}
                />
            )}
        </>
    )
}

export default MapComponent;