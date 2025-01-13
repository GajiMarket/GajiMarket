import React, { useRef, useEffect, useState } from "react";
import useMap from "../../hooks/useMap";
import useMarkers from "../../hooks/useMarkers";
import { mapConfig } from "../../config/mapConfig";
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";
import mapboxgl from "mapbox-gl";

interface MapboxProps {
    searchTerm?: string;
}

const Mapbox: React.FC<MapboxProps> = ({ searchTerm = "" }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter } = useMap(mapContainerRef, mapConfig);
    const { productLocations, fetchProductLocations, renderMarkers } = useMarkers();
    const [userMarker, setUserMarker] = useState<mapboxgl.Marker | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);


    const createCustomMarker = (): HTMLElement => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker"; // CSS로 스타일링
        return markerElement;
    };

    // 실시간 위치 추적 및 초기 포커스 설정
    useEffect(() => {
        if (!mapInstance) return;

        // 지정된 초기 좌표로 포커스 이동
        updateCenter(mapConfig.initialCenter[0], mapConfig.initialCenter[1]);

        // 위치 권한 요청 및 사용자 위치 추적
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                // 지도에 사용자 정의 마커 업데이트
                if (mapInstance) {
                    if (userMarker) {
                        userMarker.setLngLat([longitude, latitude]);
                    } else {
                        const newMarker = new mapboxgl.Marker({
                            element: createCustomMarker(), // 사용자 정의 마커 적용
                        })
                            .setLngLat([longitude, latitude])
                            .addTo(mapInstance);
                        setUserMarker(newMarker);

                        // 위치 권한이 허용된 경우 사용자 위치로 포커스 이동
                        updateCenter(longitude, latitude);
                    }
                }
            },
            (error) => {
                console.error("Error fetching current location:", error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("위치 권한이 필요합니다. 브라우저 설정에서 위치 권한을 허용해주세요.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("위치 정보를 가져올 수 없습니다.");
                        break;
                    case error.TIMEOUT:
                        alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
                        break;
                    default:
                        alert("알 수 없는 오류가 발생했습니다.");
                }
            },
            { enableHighAccuracy: true }
        );

        // 컴포넌트 언마운트 시 위치 추적 중지
        return () => navigator.geolocation.clearWatch(watchId);
    }, [mapInstance, userMarker]);


    // 상품 데이터를 가져오고 마커를 렌더링
    useEffect(() => {
        if (!mapInstance)
            fetchProductLocations(); // 데이터 가져오기
    }, [mapInstance]);

    // 상품 데이터 변경 또는 검색어 변경 시 마커 렌더링
    useEffect(() => {
        if (mapInstance) {
            const filteredLocations = productLocations.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어로 필터링
            );
            renderMarkers(mapInstance, filteredLocations); // 필터링된 데이터로 마커 렌더링
        }
    }, [mapInstance, productLocations, searchTerm]);

    // "내 위치" 버튼 클릭 핸들러
    const handleMyLocation = () => {
        if (userLocation) {
            const { lat, lng } = userLocation;
            updateCenter(lng, lat); // 현재 위치로 지도 중심 이동
        } else {
            alert("현재 위치를 가져올 수 없습니다.");
        }
    };

    return (
        <>
            <div ref={mapContainerRef} className="Mapbox_Googlemap" />
            <button onClick={handleMyLocation} className="Mapbox_Googlemap_myLocation">
            <img src={gps_icon} alt="GPS Icon" className="Mapbox_Googlemap_gps_icon" />            </button>
        </>
    );
};

export default Mapbox;
