import { useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

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
    emd_id: number;
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

        const newMarkers = locations.map((product) =>
            new mapboxgl.Marker({ color: "purple" })
                .setLngLat([product.longitude, product.latitude])
                .setPopup(
                    new mapboxgl.Popup().setHTML(`
                        <div class="popup">
                            <h3>${product.title}</h3>
                            <p>${product.description}</p>
                            <p>가격: ${product.sell_price}원</p>
                            <p>올린시간: ${product.time_elapsed}</p>
                        </div>
                    `)
                )
                .addTo(map)
        );

        setMarkers(newMarkers);
    };

    return { productLocations, fetchProductLocations, renderMarkers };
};

export default useMarkers;
