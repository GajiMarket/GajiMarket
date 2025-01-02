import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { productMarker } from '../../utils/mapUtils';
import { getProductsList, Destination } from "../../api/products.api";

export const useProducts = (map: mapboxgl.Map | null) => {

    // 서버에서 불러온 상품 목록 state
    const [products, setProducts] = useState<Destination[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]); // Marker 배열

    
    useEffect(() => {
        if (!map) return;

        let newMarkers: mapboxgl.Marker[] = []; // 새롭게 생성된 마커들을 잠시 저장해둘 배열
        
        const loadProducts = async () => {
            try {
                const products = await getProductsList();
                setProducts(products)

                newMarkers = productMarker(map, products);
            } catch (error) {
                console.error("Failed to load product markers:", error)
            }
        };

        console.log(loadProducts);
        loadProducts();

        return () => {
            newMarkers.forEach((marker) => marker.remove());
        };
    }, [map])

    return { products, markers };
}

export default useProducts;