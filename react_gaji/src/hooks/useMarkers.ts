import { useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePathStore } from "../utils/pathStore";
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
    images: string;
}
interface ApiResponse {
    success: boolean;
    data: ProductLocation[];
}


const useMarkers = () => {
    const [productLocations, setProductLocations] = useState<ProductLocation[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    // const setProduct = useProductStore((state) => state.setProduct); // product_id, lng, lat 상태관리
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
    

    // 마커 렌더링
    const renderMarkers = (map: mapboxgl.Map, locations: ProductLocation[]) => {
        markers.forEach(marker => marker.remove());

        const newMarkers = locations.map((product) => {
            const popupContent = document.createElement("div");
            const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

            popupContent.innerHTML = `
                <div class="map_popup">
                    ${imageUrl ? `<img src="${imageUrl}" alt="Product Image" class="popup_img" />` : '<div class="popup_img">No Image</div>'}
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
                const { setCoordinates} = usePathStore.getState()

                setCoordinates(product.longitude, product.latitude)
                console.log("Store Coordinates after setting:", {
                    longitude: product.longitude,
                    latitude: product.latitude,
                });

                try {
                    const data = await sendPathData();
                    // alert('데이터 전송 성공!')
                    navigate("/navigation");
                    
                } catch (error) {
                    console.error("데이터 전송 실패:", error)
                    alert("길찾기 데이터를 서버로 전송하는 데 실패했습니다. 다시 시도해주세요.");
                }
            });

            return new mapboxgl.Marker({ color: "#8a2be2" }) // 보라색 마커 생성
            .setLngLat([product.longitude, product.latitude]) // 마커 위치 설정
            .setPopup(new mapboxgl.Popup().setDOMContent(popupContent)) // 팝업 추가
            .addTo(map); // 지도에 추가
        });

        setMarkers((prevMarkers) => {
            prevMarkers.forEach((marker) => marker.remove()); // 이전 마커 제거
            return newMarkers;
        });
    };

    return { productLocations, fetchProductLocations, renderMarkers };
};

export default useMarkers;
