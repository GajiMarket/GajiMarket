import React, { useEffect, useRef } from 'react'
import { mapConfig } from "../../config/mapConfig";
import detailMap from '../../hooks/product/useProductDetailMap';
// import useMarkers from '../../hooks/useMarkers';
import productStroe from '../../utils/productStore';
import gps_icon from "../../img/gps_icon.png"
import mapboxgl from 'mapbox-gl'

//locationData는 ProductPage.tsx에서 가져온 product.location
interface LocationProps {
  locationData?: string;


}

type Location = Partial<LocationProps>


const ProductDetailMap:React.FC<Location> = ({locationData}) => {


  // const { userMarker, setUserMarker, userLocation, setUserLocation } = productStroe();
  // const {productLocations, fetchProductLocations, renderMarkers} = useMarkers();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter, parsePoint} = detailMap(mapContainerRef, mapConfig);
   

    const createCustomMarker = (): HTMLElement => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker"; // CSS로 스타일링
        return markerElement;

    };

useEffect(() => {

  if(mapInstance) {
    

    // updateCenter(mapConfig.initialCenter[0], mapConfig.initialCenter[1]);

    const newLocation = parsePoint(locationData as string);

    updateCenter(newLocation?.[0] as number, newLocation?.[1] as number);




  }

},[mapInstance, locationData]);

   




  return (
    <>
      <div className="productDetail_Mapbox" ref={mapContainerRef} />
    </>
  )
}

export default ProductDetailMap;
