import React from "react";
import useMap from "../../hooks/ejk/useMapProduct";

const ClickMap: React.FC = () => {

  useMap();
  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default ClickMap;
