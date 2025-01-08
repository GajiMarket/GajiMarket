import React, {useState} from "react";
import Mapbox from "../../components/mainpage/Mapbox";
import "../../style/Mapcontainer.css";

interface MapcontainerProps {
  onClose: () => void;
  onLocationSelect: (location: string) => void;
}

const Mapcontainer: React.FC<MapcontainerProps> = (props) => {
  const [step, setStep] = useState(1); // 화면 단계를 관리하는 상태
  const [locationInput, setLocationInput] = useState("");

  const handleMapSelection = () => {
    setStep(2); // 선택 버튼을 누르면 다음 단계로 이동
  };

  const handleLocationRegister = () => {
    if (locationInput.trim() !== "") {
      console.log("Selected Location:", locationInput);
      props.onLocationSelect(locationInput); // 🔥 장소명 전달
    }
    props.onClose();
  };

  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className="map-container">
      {step === 1 && (
        <>
          {/* 첫 번째 화면 */}
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
          {/* 두 번째 화면 */}
          <div className="map-header">
            <button className="close-button" onClick={handleClose}>
              ✖
            </button>
            <h2>선택한 곳의 장소명을 입력해주세요</h2>
            <p> 예) 강남역 1번 출구, 교보타워 앞</p>
          </div>
          <div className="map-form">
            <input
              type="text"
              placeholder="예) 강남역 1번 출구, 교보타워 앞"
              className="location-input"
              value={locationInput}
              onChange={(e) => {
                console.log("Input Changed:", e.target.value);  // 🔥 추가
                setLocationInput(e.target.value);
              }}
            />
            {/* <button className="map-container-button" onClick={handleClose}>
                            거래 장소 등록
                        </button> */}
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
