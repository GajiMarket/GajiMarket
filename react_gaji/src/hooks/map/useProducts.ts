import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { productMarker } from '../../utils/mapUtils';
import { getProductsList, Destination } from "../../api/products.api";

const useProducts = (map: mapboxgl.Map | null) => {
    useEffect(() => {
        if (!map) return;

        const loadProducts = async () => {
            try {
                const products: Destination[] = await getProductsList();
                productMarker(map, products);
                console.log(productMarker)
            } catch (error) {
                console.error("Failed to load product markers:", error)
            }
        };

        loadProducts();
    }, [map])
}

export default useProducts;