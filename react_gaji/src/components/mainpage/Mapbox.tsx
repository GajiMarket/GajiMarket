import React, { useRef } from "react";
import useMap from "../../hooks/useMap";
import { mapConfig } from "../../config/mapConfig";
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
