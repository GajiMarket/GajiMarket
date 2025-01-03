import React from "react";
import "../../style/Mypage_neighborhood_settings.css"; // 스타일 파일

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

const MypageNeighborhoodSettings: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <h1>나의 동네 설정</h1>
        <p>동네와 관련된 설정을 변경할 수 있는 페이지입니다.</p>
        <button className="action-btn">동네 설정 변경</button>
      </div>
      <Footer />
    </div>
  );
};

export default MypageNeighborhoodSettings;
