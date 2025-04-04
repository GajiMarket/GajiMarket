import { useState, useEffect, RefObject} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { mapConfig} from '../../config/mapConfig';
import productStroe from '../../utils/productStore';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const detailMap = (mapContainerRef: RefObject<HTMLDivElement>, config: typeof mapConfig) => {
// const {mapInstance, setMapInstance} = productStroe();
const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
const {setUserMarker, userMarker} = productStroe();


const parsePoint = (locationData: string): [number, number] | null => {
    try {
        // "POINT("를 ""로 대체하고 ")"를 ""로 대체해서 " "을 기준으로 분리한다다
        const coordinates = locationData.replace("POINT(", "").replace(")", "").split(" ");
        const lng = parseFloat(coordinates[0]); // 경도
        const lat = parseFloat(coordinates[1]); // 위도

        console.log("coordinates:", coordinates);

        console.log("parseFloat시킨 lng:", parseFloat(coordinates[0]));
        console.log("parseFloat시킨 lat:", parseFloat(coordinates[1]));
        

        console.log("lng와 lat 값",lng, lat);
        
        
        // [lng, lat];

        // const newMarker = new mapboxgl.Marker({element: createCustomMarker()}).setLngLat([lng, lat]).addTo(mapInstance as mapboxgl.Map);

        // setUserMarker?.(newMarker);

        // console.log("새마커:", newMarker);
        

        return [lng, lat];

      } catch (error) {

        console.error("POINT를 가져오지 못했습니다:", error);
        return null;
        
      }
    };

    
  
     useEffect(() => {
        if(!mapContainerRef.current || mapInstance) {
            console.error("mapContainerRef.current는 없습니다. 맵을 인스톨 하는데 실패했습니다.", mapContainerRef.current);
            return;
            
        }
        
        const map = new mapboxgl.Map({
            container: mapContainerRef.current as HTMLDivElement,
            style: config.defaultStyle,
            center: config.initialCenter,
            zoom: config.initialZoom,
        });

        

        // console.log("현재 맵:", map);
        console.log("현재 config.initialCenter:", config.initialCenter);
        
        

        const language = new MapboxLanguage({ defaultLanguage: config.defaultLanguage});
        map.addControl(language);

       setMapInstance(map);

    //    console.log("현재 mapInstance:", mapInstance);

       map.on("load", () => {
           console.log("지도 초기화 완료", mapInstance);
           console.log("지도 위치:", config.initialCenter);

          
           
        //    map.flyTo({ center: config.initialCenter, zoom: config.initialZoom });

        //    const marker = new mapboxgl.Marker({ element: createCustomMarker()}).setLngLat([config.initialCenter[0], config.initialCenter[1]]).addTo(map);
          
        //    console.log("현재 마커:", marker);
        
        //    setUserMarker?.(marker as mapboxgl.Marker);

       });

       return () => {
        map.remove();
       }
       
        
    }, [mapContainerRef, config]);


    // 중심 위치 초기화
    const updateCenter = (longitude: number, latitude: number) => {
        mapInstance?.flyTo({center: [longitude, latitude], essential: true});
        
        const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(mapInstance as mapboxgl.Map);
    
        console.log("현재 마커:", longitude, ",", latitude);
        
        setUserMarker?.(marker);
    }

    return { mapInstance, updateCenter, parsePoint, userMarker };
};

export default detailMap;
