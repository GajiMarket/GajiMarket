import React,{useRef} from 'react'
import { mapConfig } from "../../config/mapConfig";
import { detailMap } from '../../hooks/product/useProductDetailMap';
import useMarkers from '../../hooks/useMarkers';
import productStroe from '../../utils/productStore';
import gps_icon from "../../img/gps_icon.png"

interface LocationProps {
    locationData: {lat: string, lng: string};
}



const ProductDetailMap:React.FC<LocationProps> = ({locationData}) => {

    const {userMarker, userLocation, setUserLocation, setUserMarker} = productStroe();
    const {productLocations, fetchProductLocations, renderMarkers} = useMarkers();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter} = detailMap(mapContainerRef, mapConfig);

    const createCustomMarker = (): HTMLElement => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker"; // CSS로 스타일링
        return markerElement;

    };



  return (
    <>
      <div className="productDetail_Mapbox" ref={mapContainerRef}/>
      <img src={gps_icon} alt="user_icon" className="user_ProductDetail_gps_icon" />
    </>
  )
}

export default ProductDetailMap
