import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
import useMarkers from "../../hooks/useMarkers";
import useLocation from "../../hooks/useLocation";
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
    const { userLocation, error } = useLocation();

    // 사용자 위치 마커 관리
    useEffect(() => {
        if (!mapInstance || !userLocation) return;

        const userMarker = new mapboxgl.Marker()
            .setLngLat([userLocation.lng, userLocation.lat])
            .addTo(mapInstance);

        return () => {
            userMarker.remove();
        } 
    }, [mapInstance, userLocation]);

    // 상품 데이터 가져오기
    useEffect(() => {
        if (mapInstance) {
            fetchProductLocations();
        }
    }, [mapInstance]);

    // 상품 데이터 및 검색어로 마커 렌더링
    useEffect(() => {
        if (mapInstance) {
            const filteredLocations = productLocations.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderMarkers(mapInstance, filteredLocations);
        }
    }, [mapInstance, productLocations, searchTerm]);

    // "내 위치" 버튼 핸들러
    const handleMyLocation = () => {
        if (userLocation) {
            updateCenter(userLocation.lng, userLocation.lat);
        } else if (error) {
            alert(error);
        } else {
            alert("현재 위치를 가져올 수 없습니다.");
        }
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