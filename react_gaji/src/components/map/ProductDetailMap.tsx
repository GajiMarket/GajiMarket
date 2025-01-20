import React, { useEffect, useRef } from 'react'
import { mapConfig } from "../../config/mapConfig";
import detailMap from '../../hooks/product/useProductDetailMap';
// import useMarkers from '../../hooks/useMarkers';

//locationData는 ProductPage.tsx에서 가져온 product.location
interface LocationProps {
  locationData?: string;


}

type Location = Partial<LocationProps>


const ProductDetailMap:React.FC<Location> = ({locationData}) => {

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter, parsePoint} = detailMap(mapContainerRef, mapConfig);

useEffect(() => {

  if(mapInstance) {

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
