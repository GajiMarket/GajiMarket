import React from "react";
import Mapbox from '../../components/mainpage/Mapbox';
import "../../style/Mapcontainer.css";

interface MapcontainerProps {
    onClose: () => void;
}

const Mapcontainer: React.FC<MapcontainerProps> = (props) => {

    const handelclick = () => {
        props.onClose();
    }
    return (
        <div className="map-container">
            <header className="map-container-header">머리</header>
            <Mapbox showMyLocationButton={false}/>
            <button className="map-container-button" onClick={handelclick}>선택</button>
        </div>
    );
}

export default Mapcontainer;