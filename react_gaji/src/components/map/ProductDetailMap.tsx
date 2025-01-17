import React,{useEffect, useRef} from 'react'
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

    const {userMarker, setUserMarker, userLocation, setUserLocation} = productStroe();
    // const {productLocations, fetchProductLocations, renderMarkers} = useMarkers();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter, parsepoint} = detailMap(mapContainerRef, mapConfig);
   

    const createCustomMarker = (): HTMLElement => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker"; // CSS로 스타일링
        return markerElement;

    };

    updateCenter(mapConfig.initialCenter[0], mapConfig.initialCenter[1]);
   
    // useEffect(() => {

    //   if(!locationData) {
    //     console.error("판매자 위치를 불러오지 못했습니다.", locationData);
    //     return;
        
    //   }

    //   const handleSuccess = (position: GeolocationPosition) => {
    //     const { latitude, longitude }= position.coords;
    //     setUserLocation({ lat: latitude, lng: longitude});
    //   }
      
    // })

  
   

    const parsePoint = (point: string): [number, number] | null => {

      try {
        // "POINT("를 ""로 대체하고 ")"를 ""로 대체해서 " "을 기준으로 분리한다다
        const coordinates = point.replace("POINT(", "").replace(")", "").split(" ");
        const lng = parseFloat(coordinates[0]); // 경도
        const lat = parseFloat(coordinates[1]); // 위도

        console.log("lng와 lat 값",lng, lat);
        
        
        return [lng, lat];

      } catch (error) {

        console.error("POINT를 가져오지 못했습니다:", error);
        return null;
        
      }
    };

    
    const coordinates = parsePoint(locationData as string) as [number, number];

    console.log("현재 coordinates:", coordinates);

    const [lng, lat] = coordinates;

    setUserLocation?.([lng, lat]);

    console.log("현재 userLocation:", userLocation);
    
    useEffect(() => {
      if(!locationData) {
        console.error("locationData가 없습니다.");
        return;
      }

      const coordinates = parsePoint(locationData);

      if(!coordinates) {

        console.error("좌표를 파싱하지 못했습니다.");

        return;
        
      }

      setUserLocation?.(coordinates);

      if(!mapInstance) {
        console.error("Mapbox 인스턴스가 없습니다.");
        return;
      }

      new mapboxgl.Marker({element: createCustomMarker()}).setLngLat(coordinates).addTo(mapInstance);

      updateCenter(coordinates[0], coordinates[1]);
    }, [locationData, mapInstance, setUserLocation])
   




  return (
    <>
      <div className="productDetail_Mapbox" ref={mapContainerRef} />
    </>
  )
}

export default ProductDetailMap;
