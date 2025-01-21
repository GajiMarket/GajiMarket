import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import NaviPopup from "./NaviPopup";
import useMap from '../../hooks/ejk/useMap.ej';
import useLocation from "../../hooks/useLocation";
import { usePathData } from "../../hooks/ejk/useNavitation";
import { updateOrCreateMarker, mapRoute, processCoordinates } from "../../utils/mapUtils";
import { CustomProperties } from "../../api/pathFinder.api";

const MapComponent: React.FC = () => {
    const map = useMap();
    const { pathData, loading, error } = usePathData(); // useNavigation return 변수 받기
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState({ totalLength: 0, totalTime: 0 });

    const { userLocation, error: locationError, createCustomMarker } = useLocation(); // 현재위치 표시 hook
    const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
 
    // 경로 데이터 렌더링
    useEffect(() => {
        if (loading || error || !map || !pathData || !pathData.features || pathData.features.length === 0) return;

        const features = pathData.features[0];
        const coordinates = pathData.coordinates || processCoordinates(pathData.features);

        if (!features || coordinates.length === 0) {
          console.error("경로 데이터가 유효하지 않습니다.");
          return;
        }
    
        const { totalLength, totalTime } = features.properties as CustomProperties;
    
        // 시작 및 끝 마커 추가
        updateOrCreateMarker(map, coordinates[0], null, {
          imageUrl: "/public/img/start.svg",
          className: "marker start",
        });
        updateOrCreateMarker(map, coordinates[coordinates.length - 1], null, {
          imageUrl: "/public/img/end.svg",
          className: "marker end",
        });
    
        // 경로 그리기
        mapRoute(map, { coordinates });
    
        // 팝업 데이터 설정
        setPopupData({ totalLength, totalTime });
        setPopupVisible(true);
    }, [map, pathData, loading, error]);

    // 사용자 위치 업데이트
    useEffect(() => {
      if (!map || !userLocation) return;

      const userMarker = new mapboxgl.Marker({
          element: createCustomMarker(),
      })
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map);

      return () => {
          userMarker.remove();
      } 
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
            {locationError && (
                <div className="error-popup">
                    <p>{locationError}</p>
                </div>
            )}
        </>
    );
};

export default MapComponent;