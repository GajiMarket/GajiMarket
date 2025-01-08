import React, { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import axios from "axios";
import useMap from "../../hooks/useMap";
import { mapConfig } from "../../config/mapConfig";
import "../../style/Mapbox.css";
import gps_icon from "../../img/gps_icon.png";

interface ProductLocation {
    product_id: number;
    title: string;
    description: string;
    sell_price: number;
    latitude: number; 
    longitude: number; 
    photo: string;
    status: string;
    created_at: Date;
    view_count: number;
    sell_location: string;
    emd_id: number;
    member_no: number;
}


const Mapbox: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null); // 지도 렌더링할 DOM 요소 참조
    const mapInstanceRef = useRef<mapboxgl.Map | null>(null); // Mapbox 인스턴스 관리
    
    const [productLocations, setProductLocations] = useState<ProductLocation[]>([]);
    
    const { updateLocation } = useMap(mapContainerRef, mapConfig.defaultStyle, {
        ...mapConfig,
        initialCenter: mapConfig.initialCenter, // 초기 위치 설정
    });
    
    // 지도 초기화
    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, // 렌더링할 DOM 요소
                style: mapConfig.defaultStyle, // 지도 스타일
                center: mapConfig.initialCenter, // 초기 중심 좌표
                zoom: mapConfig.initialZoom, // 초기 줌 레벨
            });
        }
    }, []);


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

    useEffect(() => {
        const fetchProductLocations = async () => {
            try {
                const response = await axios.get("http://localhost:8000/map");
                console.log('mapbox77',response.data);
                setProductLocations(response.data); // API에서 받아온 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching product locations:", error);
            }
        };

        fetchProductLocations();
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current) return;

        const map = mapInstanceRef.current;

        productLocations.forEach((product) => {
            // 마커 생성 및 추가
            new mapboxgl.Marker({ color: "purple" }) // 마커 색상 지정
                .setLngLat([product.longitude, product.latitude]) // 마커 위치 설정
                .setPopup(
                    new mapboxgl.Popup().setHTML(`
                        <div class="popup">
                            <img src="${product.image}" alt="${product.title}" class="popup-image" />
                            <h3 class="popup-name">${product.title}</h3>
                            <p class="popup-description">${product.description}</p>
                            <p class="popup-price">${product.price}</p>
                            <p class="popup-distance">${product.distance}</p>
                        </div>
                    `)
                )
                .addTo(map); // 마커를 지도에 추가
        });
    }, [productLocations]);

    // "내 위치" 버튼 클릭 핸들러
    const handleMyLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // 지도 이동
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo({
                        center: [longitude, latitude],
                        essential: true,
                    });
                }
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
            <div ref={mapContainerRef} className="Mapbox_Googlemap" />
            <button
                onClick={handleMyLocation}
                className="Mapbox_Googlemap_myLocation"
            >
                <img
                    src={gps_icon}
                    alt="GPS Icon"
                    className="Mapbox_Googlemap_gps_icon"
                />
            </button>
        </>
    );
};

export default Mapbox;