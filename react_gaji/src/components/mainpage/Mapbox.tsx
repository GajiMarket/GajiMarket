import React, { useRef, useEffect, useState } from "react";
import useMap from "../../hooks/useMap";
import { mapConfig } from "../../config/mapConfig";
import { mapMarker, productMarker } from "../../utils/mapUtils";
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";

const Mapbox: React.FC = () => {
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
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
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
    
            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
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
