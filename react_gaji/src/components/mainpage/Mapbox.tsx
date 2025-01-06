import React, { useRef, useEffect, useState } from "react";
import useMap from "../../hooks/useMap";
import { mapConfig } from "../../config/mapConfig";
import { postLocation } from '../../api/location.api';
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";

interface MapboxProps {
    showMyLocationButton?: boolean; // 내 위치 버튼 표시 여부
    longitude: number;
    latitude: number;
}

const Mapbox: React.FC<MapboxProps> = ({showMyLocationButton=true}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [initialCenter, setInitialCenter] = useState<[number, number]>(mapConfig.initialCenter); // 초기값 설정
    const { updateLocation, initializeMap } = useMap(mapContainerRef, mapConfig.defaultStyle, {
        ...mapConfig,
        initialCenter,
    });

    // 사용자 위치 가져오기
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setInitialCenter([longitude, latitude]); // 초기 위치 업데이트
                    postLocation(longitude, latitude); // location api롤 좌표 전송
                },
                (error) => {
                    console.error("Error fetching initial location:", error.message);
                    alert("초기 위치를 가져올 수 없어 기본 위치로 설정합니다.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("브라우저에서 위치 정보를 지원하지 않습니다.");
        }
    }, []);

    // 지도 초기화
    useEffect(() => {
        if (initialCenter) {
            initializeMap(); // 초기 위치가 업데이트되면 지도 초기화
        }
    }, [initialCenter]);

    // 내 위치 버튼 클릭 핸들러
    const handleMyLocation = () => {
        if (initialCenter) {
            const [longitude, latitude] = initialCenter;
            updateLocation(longitude, latitude); // 저장된 초기 위치로 포커스 이동
        } else {
            alert("초기 위치를 가져오지 못했습니다.");
        }
    };
    

    return (
        <>
            <div ref={mapContainerRef} className="Mapbox_Googlemap" />
            {showMyLocationButton && (
            <button onClick={handleMyLocation} className="Mapbox_Googlemap_myLocation">
                <img src={gps_icon} className="Mapbox_Googlemap_gps_icon" />
            </button>
            )}
        </>
    );
};

export default Mapbox;
