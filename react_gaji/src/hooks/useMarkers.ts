import { useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../utils/pathStore";
import { sendPathData } from "../api/pathFinder.api";

interface ProductLocation {
    product_id: number;
    title: string;
    description: string;
    sell_price: number;
    longitude: number;
    latitude: number;
    status: string;
    created_at: string;
    view_count: number;
    member_no: number;
    time_elapsed: string;
}
interface ApiResponse {
    success: boolean;
    data: ProductLocation[];
}


const useMarkers = () => {
    const [productLocations, setProductLocations] = useState<ProductLocation[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const setProduct = useProductStore((state) => state.setProduct); // product_id, lng, lat 상태관리
    const navigate = useNavigate();

    // 상품 데이터 가져오기
    const fetchProductLocations = async () => {
        try {
            const response = await axios.get<ApiResponse>(
                "http://localhost:3000/map/product_preview"
                );
            const { success, data } = response.data;
            if(success && Array.isArray(data)){
                setProductLocations(data);
            }else{
                console.error("API returned non-array data:", response.data);
            }
        } catch (error) {
            console.error("Error fetching product locations:", error);
        }
    };

    // 기존 마커 제거
    const clearMarkers = () => {
        markers.forEach((marker) => marker.remove());
        setMarkers([]);
    };

    // 마커 렌더링
    const renderMarkers = (map: mapboxgl.Map, locations: ProductLocation[]) => {
        if (!Array.isArray(locations)) {
            console.error("Invalid locations data. Expected an array but got:", locations);
            return;
        }
        
        clearMarkers(); // 기존 마커 제거

        const newMarkers = locations.map((product) => {
            const popupContent = document.createElement("div");

            popupContent.innerHTML = `
                <div class="map_popup">
                    <div class="popup_img">${product.status}</div>
                    <h3 class="popup_title">${product.title}</h3>
                    <p class="popup_description">${product.description}</p>
                    <p class="popup_sell_price">가격: ${product.sell_price}원</p>
                    <p class="popup_time">올린시간: ${product.time_elapsed}</p>
                    <button class="navigate-btn">길찾기</button>
                </div>
            `;

            // 버튼 클릭 이벤트 처리
            const navigateButton = popupContent.querySelector(".navigate-btn");
            navigateButton?.addEventListener("click", async () => {
                setProduct(product.longitude, product.latitude);
                try {
                    await sendPathData(product.longitude, product.latitude);
                    alert('데이터 전송 성공!')
                } catch (error) {
                    console.error("데이터 전송 실패:", error)
                    alert("길찾기 데이터를 서버로 전송하는 데 실패했습니다. 다시 시도해주세요.");
                }

                // navigate("/navigation", {
                //     state: { product }, // 클릭한 마커의 데이터만 전달
                // });
                navigate("/navigation");
            });

            return new mapboxgl.Marker({ color: "purple" })
                .setLngLat([product.longitude, product.latitude])
                .setPopup(new mapboxgl.Popup().setDOMContent(popupContent)) // HTML 팝업 추가
                .addTo(map);
        });

        setMarkers(newMarkers);
    };

    return { productLocations, fetchProductLocations, renderMarkers };
};

export default useMarkers;
