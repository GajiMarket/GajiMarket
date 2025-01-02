import React, { useEffect, useRef } from "react";
import useMap from "../../hooks/map/useMap";
import useProducts from "../../hooks/map/useProducts";
import { mapConfig } from "../../config/mapConfig";
import { mapMarker, productMarker } from "../../utils/mapUtils";
import "../../style/Mapbox.css";

const Mapbox:React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

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
        <div 
            ref={mapContainerRef}
            className="Mapbox_Googlemap"
        />
    );
}

export default Mapbox;