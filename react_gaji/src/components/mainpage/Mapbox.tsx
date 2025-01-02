import React, { useEffect, useRef } from "react";
import useMap from "../../hooks/map/useMap";
import useProducts from "../../hooks/map/useProducts";
import { mapConfig } from "../../config/mapConfig";
import { mapMarker, productMarker } from "../../utils/mapUtils";
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";

const Mapbox: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { updateLocation } = useMap(mapContainerRef, mapConfig.defaultStyle, mapConfig);

    // 내 위치 버튼 클릭 핸들러
    const handleMyLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateLocation(longitude, latitude);
                },
                (error) => {
                    console.error("Error fetching location:", error.message);
                    alert("위치를 가져올 수 없습니다.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("브라우저에서 위치 정보를 지원하지 않습니다.");
        }
    };

    const { map } = useMap({
        mapContainerRef,
        config: mapConfig,
    });

    // 상품 목록 가져오기
    const { products, loading, error } = useProducts();

    useEffect(() => {
        if (!map || loading || error) return;
        mapMarker(map, mapConfig.initialCenter);
        productMarker(map, products);
    }, [map, products, loading, error])
    
    return (
        <>
            <div ref={mapContainerRef} className="Mapbox_Googlemap" />
            <button onClick={handleMyLocation} className="Mapbox_Googlemap_myLocation">
                <img src={gps_icon} className="Mapbox_Googlemap_gps_icon" />
            </button>
        </>
    );
};

export default Mapbox;
