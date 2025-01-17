import React, { useState } from "react";
import "../../style/Mypage_neighborhood_settings.css"; // 스타일 파일
import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import Mapbox from "../all/Mapbox"; // Mapbox 컴포넌트 불러오기

const MypageNeighborhoodSettings: React.FC = () => {
  const [neighborhood, setNeighborhood] = useState<string | null>("구로동");

  const handleSetNeighborhood = () => {
    const newNeighborhood = "가산동"; // Mock: 위치 설정 후 행정구역 정보 가져오기
    setNeighborhood(newNeighborhood);
  };

  const handleSetNeighborhoodWithAlert = () => {
    // "현재 위치로 설정되었습니다." 알림창 호출 포함
    handleSetNeighborhood();
    alert("현재 위치로 설정되었습니다.");
  };

  const handleDeleteNeighborhood = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 버튼 클릭 이벤트 방지
    setNeighborhood(null); // 동네 정보 삭제
  };

  return (
    <div className="neighbor-settings-page">
      <Header />
      <div className="neighbor-settings-content">
        <h1 className="neighbor-title">나의 동네 설정</h1>
        <div className="neighbor-map-container">
          {/* 지도 표시 영역 */}
          <div className="neighbor-map-placeholder">
            <Mapbox /> {/* Mapbox 컴포넌트 렌더링 */}
          </div>
        </div>
        <div className="neighbor-actions-right">
          <button
            className="neighbor-set-location-btn"
            onClick={handleSetNeighborhoodWithAlert}
          >
            현재 위치로 설정하기
          </button>
          {neighborhood ? (
            <button className="neighbor-tag">
              {neighborhood}
              <span
                className="neighbor-delete-icon"
                onClick={handleDeleteNeighborhood} // 삭제만 수행
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
      <Footer currentPage={4}/>
    </div>
  );
};

export default MypageNeighborhoodSettings;
