import React, { useEffect, useState, useRef } from "react";
import NaviPopup from "./NaviPopup";
import useMap from '../../hooks/ejk/useMap.ej';
import useLocation from "../../hooks/useLocation";
import { usePathData } from "../../hooks/ejk/useNavitation";
import { mapMarker, updateOrCreateMarker, mapRoute, processCoordinates } from "../../utils/mapUtils";
import { CustomProperties } from "../../api/pathFinder.api";

const MapComponent: React.FC = () => {
    const map = useMap();
    const { pathData, loading, error } = usePathData(); // useNavigation return 변수 받기
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState({ totalLength: 0, totalTime: 0 });

    const { userLocation, error: locationError } = useLocation(); // 현재위치 표시 hook
    const userMarkerRef = useRef<mapboxgl.Marker | null>(null)

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

    // 기존 사용자 위치를 갱신하도록 수정 아니면 매번 새로운 마커 생성해서 엄청 렉걸림
    useEffect(() => {
        if (!map || !userLocation) return;
        userMarkerRef.current = updateOrCreateMarker(map, [userLocation.lng, userLocation.lat], userMarkerRef.current);
    }, [map, userLocation]);

    return (
        <>
            <div id="map" style={{ width: '100%', height: '100vh' }}/>
            {popupVisible && (
                <NaviPopup
                    totalLength={popupData.totalLength}
                    totalTime={popupData.totalTime}
                />
            )}
            {/* {locationError && (
                <div className="error-popup">
                    <p>{locationError}</p>
                </div>
            )} */}
        </>
    )
}

export default MapComponent;