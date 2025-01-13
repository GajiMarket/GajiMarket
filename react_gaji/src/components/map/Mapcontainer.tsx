import React,{useState} from "react";
import ClickMap from "../../components/map/ClickMap";
import useMapStep from "../../hooks/product/useMapStep";
import useLocationInput from "../../hooks/product/useLocationInput";
import "../../style/Mapcontainer.css";

interface MapcontainerProps {
  onClose: () => void;
  onLocationSelect: (location: { lng: number; lat: number; name: string }) => void;
}

const Mapcontainer: React.FC<MapcontainerProps> = ({ onClose, onLocationSelect }) => {
  const [selectedLngLat, setSelectedLngLat] = useState<{ lng: number; lat: number } | null>(null);
  const { step, nextStep, resetStep } = useMapStep();
  const { locationInput, handleInputChange } = useLocationInput();

  const handleMapSelection = (lngLat: mapboxgl.LngLat) => {
    setSelectedLngLat(lngLat);
    nextStep();
  };

  const handleNextStep = () => {
    if (!selectedLngLat) {
      alert("지도를 클릭하여 위치를 선택해주세요.");
      return;
    }
    nextStep();
  };

  const handleLocationRegister = () => {
    if (!selectedLngLat || locationInput.trim() === "") {
      alert("위치와 장소명을 모두 입력해주세요.");
      return;
    }
  
    const locationData = {
      lng: selectedLngLat.lng,
      lat: selectedLngLat.lat,
      name: locationInput.trim(),
    };
    console.log("Registered Location:", locationData);
    onLocationSelect(locationData);
    onClose();
    resetStep();
  };

  const handleClose = () => {
    resetStep();
    onClose();
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
          <div className="map-click-container">
            <ClickMap onLocationClick={handleMapSelection} />
            <button
              className="map-click-container-button"
              onClick={handleNextStep}
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
