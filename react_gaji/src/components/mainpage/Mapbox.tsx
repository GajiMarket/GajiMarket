import React, { useEffect, useRef } from "react";
import useMap from "../../hooks/map/useMap";
import { mapConfig } from "../../config/mapConfig";
import useLocation from "../../hooks/useLocation";
import { pathFinder } from "../../api/pathFinderApi";
import "../../style/Mapbox.css";

const Mapbox:React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { location, error, loading } = useLocation();

    useMap({
        mapContainerRef,
        style: mapConfig.defaultStyle,
        center: mapConfig.initialCenter,
        // mapConfig
        // config: {
            // ...mapConfig,
            // initialCenter: mapConfig.initialCenter,
            // initialCenter: location 
            //     ? [location.lng, location.lat]
            //     : mapConfig.initialCenter
        // }
    });

    // useEffect(() => {
    //     const fetchLocation = async () => {
    //         if (location) {
    //             try {
    //                 const startData = await pathFinder(location)
    //                 console.log('받은 데이터:', startData);
    //             } catch (error) {
    //                 console.error('위치 전송 실패:', error);
    //             }
    //         }
    //     };
    //     try {
    //         fetchLocation();
    //     } catch (error) {
    //         console.error('fetchLocation running error:', error)
    //     }
    // }, [location])

    return (
        <div 
            ref={mapContainerRef}
            className="Mapbox_Googlemap"
        />
    );
}

export default Mapbox;