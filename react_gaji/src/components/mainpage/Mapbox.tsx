import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
import useMarkers from "../../hooks/useMarkers";
import { mapConfig } from "../../config/mapConfig";
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";

interface MapboxProps {
    searchTerm: string;
}

const Mapbox: React.FC<MapboxProps> = ({ searchTerm }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter } = useMap(mapContainerRef, mapConfig);
    const { productLocations, fetchProductLocations, renderMarkers } = useMarkers();

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
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                updateCenter(longitude, latitude); // 지도 중심 이동
            },
            (error) => {
                console.error("Error fetching current location:", error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("위치 정보를 사용할 수 있도록 허용해 주세요.");
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
    };

    return (
        <>
            <div ref={mapContainerRef} className="Mapbox_Googlemap" />
            <button onClick={handleMyLocation} className="Mapbox_Googlemap_myLocation">
                <img src={gps_icon} alt="GPS Icon" className="Mapbox_Googlemap_gps_icon" />
            </button>
        </>
    );
};

export default Mapbox;
