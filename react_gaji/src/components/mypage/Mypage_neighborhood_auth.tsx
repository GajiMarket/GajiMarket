import React, { useState } from "react";
import "../../style/Mypage_neighborhood_auth.css"; // 스타일 파일

import Header from "./Header.tsx"; // Header 컴포넌트
import Footer from "../all/Footer.tsx"; // Footer 컴포넌트
import currentLocationIcon from "../../assets/icons/current-location-icon.png"; // 현재 위치 아이콘

const MypageNeighborhoodAuth: React.FC = () => {
  const [neighborhood, setNeighborhood] = useState<string | null>("가산동");

  const handleCurrentLocationClick = () => {
    alert("현재 위치로 설정되었습니다.");
  };

  const handleDeleteNeighborhood = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 버튼 클릭 이벤트 방지
    setNeighborhood(null);
  };

  const handleSetNeighborhood = () => {
    const newNeighborhood = "신갈동"; // 새로운 동네 설정 (예시)
    setNeighborhood(newNeighborhood);
  };

  const handleAuthComplete = () => {
    alert("나의 동네가 인증되었습니다.");
  };

  return (
    <div className="auth-page-container">
      <Header />
      <div className="auth-content">
        <h1 className="auth-title">나의 동네 인증</h1>
        <div className="auth-map-container">
          {/* 지도 표시 영역 */}
          <div className="auth-map-placeholder">
            [지도 표시 영역]
            <button
              className="auth-current-location-btn"
              onClick={handleCurrentLocationClick}
            >
              <img
                src={currentLocationIcon}
                alt="현재 위치 아이콘"
                className="auth-current-location-icon"
              />
            </button>
          </div>
        </div>
        <div className="auth-button-container">
          {neighborhood ? (
            <button className="auth-tag">
              {neighborhood}
              <span
                className="auth-delete-icon"
                onClick={handleDeleteNeighborhood}
              >
                ×
              </span>
            </button>
          ) : (
            <button className="auth-tag" onClick={handleSetNeighborhood}>
              동네 설정
            </button>
          )}
          <button className="auth-complete-btn" onClick={handleAuthComplete}>
            나의 동네 인증완료
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageNeighborhoodAuth;