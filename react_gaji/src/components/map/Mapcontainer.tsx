import React from "react";
import Mapbox from "../../components/all/Mapbox";
import useMapStep from "../../hooks/product/useMapStep";
import useLocationInput from "../../hooks/product/useLocationInput";
import "../../style/Mapcontainer.css";

interface MapcontainerProps {
  onClose: () => void;
  onLocationSelect: (location: string) => void;
}

const Mapcontainer: React.FC<MapcontainerProps> = (props) => {
  const { step, nextStep, resetStep } = useMapStep();
  const { locationInput, handleInputChange } = useLocationInput();

  const handleMapSelection = () => {
    nextStep();
  };

  const handleLocationRegister = () => {
    if (locationInput.trim() !== "") {
      console.log("Selected Location:", locationInput);
      props.onLocationSelect(locationInput);
    }
    props.onClose();
    resetStep();
  };

  const handleClose = () => {
    props.onClose();
    resetStep();
  };

  return (
    <div className="map-container">
      {step === 1 && (
        <>
          <div className="map-header">
            <button className="close-button" onClick={handleClose}>
              ✖
            </button>
            <h2>이웃과 만나서 거래하고 싶은 장소를 선택해주세요.</h2>
            <p>만나서 거래할 때는 누구나 찾기 쉬운 공공장소가 좋아요.</p>
          </div>
          <div className="map-container">
            <Mapbox showMyLocationButton={false} />
            <button
              className="map-container-button"
              onClick={handleMapSelection}
            >
              선택
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="map-header">
            <button className="close-button" onClick={handleClose}>
              ✖
            </button>
            <h2>선택한 곳의 장소명을 입력해주세요</h2>
            <p>예) 강남역 1번 출구, 교보타워 앞</p>
          </div>
          <div className="map-form">
            <input
              type="text"
              placeholder="예) 강남역 1번 출구, 교보타워 앞"
              className="location-input"
              value={locationInput}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button
              className="map-container-button"
              onClick={handleLocationRegister}
            >
              거래 장소 등록
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Mapcontainer;
