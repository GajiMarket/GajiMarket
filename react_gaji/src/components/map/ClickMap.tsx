import React from "react";
import useMap from '../../hooks/ejk/useMap';

const clickMap: React.FC = () => {
    // const map = useMap();

    useMap();

    return <div id="map" style={{ width: '100%', height: '100vh' }} />
};

export default clickMap;