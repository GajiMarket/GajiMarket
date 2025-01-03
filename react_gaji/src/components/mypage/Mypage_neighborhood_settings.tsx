import React, { useState } from "react";
import "../../style/Mypage_neighborhood_settings.css"; // 스타일 파일
import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import currentLocationIcon from "../../assets/icons/current-location-icon.png"; // 현재 위치 아이콘

const MypageNeighborhoodSettings: React.FC = () => {
  const [neighborhood, setNeighborhood] = useState<string | null>("신갈동");

  const handleCurrentLocationClick = () => {
    alert("현재 위치로 설정되었습니다.");
  };

  const handleDeleteNeighborhood = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 버튼 클릭 이벤트 방지
    setNeighborhood(null);
  };

  const handleSetNeighborhood = () => {
    // Mock: 위치 설정 후 행정구역 정보를 가져온다고 가정
    const newNeighborhood = "가산동"; // 예시: 실제로는 API 호출로 설정
    setNeighborhood(newNeighborhood);
  };

  return (
    <div className="neighbor-settings-page">
      <Header />
      <div className="neighbor-settings-content">
        <h1 className="neighbor-title">나의 동네 설정</h1>
        <div className="neighbor-map-container">
          {/* 지도 표시 영역 */}
          <div className="neighbor-map-placeholder">
            [지도 표시 영역]
            <button
              className="neighbor-current-location-btn"
              onClick={handleCurrentLocationClick}
            >
              <img
                src={currentLocationIcon}
                alt="현재 위치 아이콘"
                className="neighbor-current-location-icon"
              />
            </button>
          </div>
        </div>
        <div className="neighbor-actions-right">
          <button className="neighbor-set-location-btn">현재 위치로 설정하기</button>
          {neighborhood ? (
            <button className="neighbor-tag">
              {neighborhood}
              <span
                className="neighbor-delete-icon"
                onClick={handleDeleteNeighborhood}
              >
                ×
              </span>
            </button>
          ) : (
            <button className="neighbor-tag" onClick={handleSetNeighborhood}>
              동네 설정
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageNeighborhoodSettings;
