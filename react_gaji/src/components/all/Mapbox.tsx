import React, { useRef, useEffect } from "react";
import alluseMap from "../../hooks/allusemap";
import { mapConfig } from "../../config/mapConfig";
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";

interface MapboxProps {
    showMyLocationButton?: boolean; // "내 위치" 버튼 표시 여부
}

const Mapbox: React.FC<MapboxProps> = ({ showMyLocationButton = true }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null); // 지도 렌더링할 DOM 요소 참조
    const { updateLocation } = alluseMap(mapContainerRef, mapConfig.defaultStyle, {
        ...mapConfig,
        initialCenter: mapConfig.initialCenter, // 초기 위치 설정
    });

    // 실시간 위치 추적
    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateLocation(longitude, latitude); // 지도 중심과 마커 위치 업데이트
                    console.log("Real-time location:", longitude, latitude); // 디버깅 로그
                },
                (error) => {
                    console.error("Error fetching real-time location:", error.message); // 에러 처리
                    alert("위치를 가져오는 중 문제가 발생했습니다.");
                },
                {
                    enableHighAccuracy: false, // 높은 정확도 설정
                    maximumAge: 0, // 캐싱된 위치를 사용하지 않음
                    timeout: 5000, // 위치 가져오기 타임아웃 설정
                }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId); // 컴포넌트 언마운트 시 위치 추적 중지
            };
        } else {
            alert("브라우저에서 위치 정보를 지원하지 않습니다.");
        }
    }, []);

    // "내 위치" 버튼 클릭 핸들러
    const handleMyLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                updateLocation(longitude, latitude); // 현재 위치로 지도 중심과 마커 이동
            },
            (error) => {
                console.error("Error fetching current location:", error.message);
                alert("현재 위치를 가져오지 못했습니다.");
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <>
            <div ref={mapContainerRef} className="Mapbox_Googlemap" /> {/* 지도 렌더링 DOM */}
            {showMyLocationButton && ( // "내 위치" 버튼 표시 여부
                <button
                    onClick={handleMyLocation} // 버튼 클릭 시 핸들러 실행
                    className="Mapbox_Googlemap_myLocation"
                >
                    <img src={gps_icon} alt="GPS Icon" className="Mapbox_Googlemap_gps_icon" /> {/* 아이콘 이미지 */}
                </button>
            )}
        </>
    );
};

export default Mapbox;