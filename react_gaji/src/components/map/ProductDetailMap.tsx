import React,{useEffect, useRef} from 'react'
import { mapConfig } from "../../config/mapConfig";
import { detailMap } from '../../hooks/product/useProductDetailMap';
// import useMarkers from '../../hooks/useMarkers';
import productStroe from '../../utils/productStore';
import gps_icon from "../../img/gps_icon.png"
import mapboxgl from 'mapbox-gl'

//locationData는 ProductPage.tsx에서 가져온 product.location
interface LocationProps {
    locationData: string;

    
}



const ProductDetailMap:React.FC<LocationProps> = ({locationData}) => {

    const {userMarker, setUserMarker} = productStroe();
    // const {productLocations, fetchProductLocations, renderMarkers} = useMarkers();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter} = detailMap(mapContainerRef, mapConfig);

    const createCustomMarker = (): HTMLElement => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker"; // CSS로 스타일링
        return markerElement;

    };

   

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

    

    useEffect(() => {

      if (!mapInstance){

        console.error("mapInstance가 없습니다:", mapInstance);

        return;
        
      } 

      updateCenter(mapConfig.initialCenter[0], mapConfig.initialCenter[1]);

      // 파라미터를 넣으면 [number, number]로 분리
      const coordinates = parsePoint(locationData);

      if(!coordinates) {
        console.error("판매자 위치 값을 가져오지 못했습니다.", locationData);

        return;
        
      }

      const [lng, lat] = coordinates;

      //지도 중심 업데이트트
      updateCenter(lng, lat);

      if(locationData) {

        const marker = new mapboxgl.Marker({element: createCustomMarker()}).setLngLat([lng, lat]).addTo(mapInstance as mapboxgl.Map);
        
        // 상태 저장
        setUserMarker?.(marker);
      }

      // 기존 마커 있으면 삭제제
      if (userMarker) {
        userMarker.remove();
      }

      // 새로운 마커 생성성
      // 경도, 위도 순서로 설정
      

    }, [mapInstance, setUserMarker]);



  return (
    <>
      <div className="productDetail_Mapbox" ref={mapContainerRef}/>
    </>
  )
}

export default ProductDetailMap;
