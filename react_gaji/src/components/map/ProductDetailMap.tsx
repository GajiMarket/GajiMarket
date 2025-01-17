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



const ProductDetailMap:React.FC<LocationProps> = ({locationData}) => {

    const {userMarker, setUserMarker, userLocation, setUserLocation} = productStroe();
    // const {productLocations, fetchProductLocations, renderMarkers} = useMarkers();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { mapInstance, updateCenter} = detailMap(mapContainerRef, mapConfig);
   

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

    useEffect(() => {
      if(locationData) {

        const coordinates = parsePoint(locationData) as [number, number];

        console.log("현재 coordinates:", coordinates);

        const [lng, lat] = coordinates;
        

        
        setUserLocation?.([lng, lat]);
      }
    })


    

  

    // useEffect(() => {
    //   if(!mapInstance || !userLocation) {

    //     console.error("현재 판매자 위치:", userLocation);

    //     return;
        
    //   }

    //   console.log("판매자 위치:", userLocation);

    //   const userMarker = new mapboxgl.Marker({
    //     element: createCustomMarker(),
    //   }).setLngLat([userLocation?.[1] as number, userLocation?.[0] as number ]).addTo(mapInstance);
      
    //   return () => {
    //     userMarker.remove();
    //   }

    
    // }, [mapInstance, userLocation]);

    

  //   useEffect(() => {

  //     if (!mapInstance){

  //       console.error("mapInstance가 없습니다:", mapInstance);
  //       console.error("userLocation이 없습니다:", userLocation);
        

  //       return;
        
  //     } 

  //   // const mapUpdate = () => {
  //     //현재 위치
  //     updateCenter(mapConfig.initialCenter[0], mapConfig.initialCenter[1]);

  //     console.log("현재 맵 위치(초기 config):", mapInstance.getCenter);
  //     console.log("현재 마커:", userMarker?.toString() as string);
      
      
      

  //     // 파라미터를 넣으면 [number, number]로 분리
  //     if(locationData) {

  //       const coordinates = parsePoint(locationData as string);

  //       console.log("coodinates값:", coordinates);

        

  //       if(!coordinates) {
  //         console.error("판매자 위치 값을 가져오지 못했습니다.", locationData);

  //         return;
          
  //       }

  //       if (coordinates) {


  //         const [lng, lat] = coordinates;

          
  //         setUserLocation?.([lat, lng]);


  //         if(userLocation) {
  //          // 새로운 마커 생성성
  //         // 경도, 위도 순서로 설정

          
  //         if(!userMarker) {
  //           console.error("userMarker가 없습니다:", userMarker);
  //           return;
              
  //         }

  //         const newMarker = new mapboxgl.Marker({
  //           element: createCustomMarker(),
  //         }).setLngLat([userLocation[1], userLocation[0]]).addTo(mapInstance);

  //         setUserMarker?.(newMarker);


         
    

  //         //지도 중심 업데이트
  //         updateCenter(lng, lat);

  //         return () => {
  //           newMarker.remove
  //         }
  //       }

       
  //     }


  //   // }

  //     // mapUpdate();

  //     // // 기존 마커 있으면 삭제제
  //     // if (userMarker) {
  //     //   userMarker.remove();
  //     // }
      

  //   }
  // }, [mapInstance]);



  return (
    <>
      <div className="productDetail_Mapbox" ref={mapContainerRef} />
    </>
  )
}

export default ProductDetailMap;
