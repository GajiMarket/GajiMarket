import React from "react";
import "../../style/Mypage_neighborhood_auth.css"; // 스타일 파일

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";


const MypageNeighborhoodAuth: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <h1>나의 동네 인증</h1>
        <p>동네 인증을 확인하고 진행할 수 있는 페이지입니다.</p>
        <button className="action-btn">동네 인증 진행</button>
      </div>
      <Footer />
    </div>
  );
};

export default MypageNeighborhoodAuth;
