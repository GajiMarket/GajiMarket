import React from "react";
import { useNavigate } from "react-router-dom"; // navigate 추가
import "../../style/Mypage_terms.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  // 각 항목에 대한 이동 핸들러
  const handleNavigateToServiceTerms = () => {
    navigate("/mypage_service_terms"); // 서비스 이용 약관 페이지로 이동
  };

  const handleNavigateToPrivacyPolicy = () => {
    navigate("/mypage_privacy_policy"); // 개인정보 처리방침 페이지로 이동
  };

  const handleNavigateToOperationPolicy = () => {
    navigate("/mypage_operation_policy"); // 운영정책 페이지로 이동
  };

  const handleNavigateToLocationTerms = () => {
    navigate("/mypage_terms_detail"); // 위치기반서비스 이용 약관 페이지로 이동
  };

  return (
    <div className="TermsPage">
      <Header />
      <div className="termsPage-container">
        <h1 className="termsPage-title">이용 및 약관</h1>
        <ul className="termsPage-list">
          <li className="termsPage-item" onClick={handleNavigateToServiceTerms}>
            <span className="termsPage-text">서비스 이용 약관</span>
            <span className="termsPage-arrow">{'>'}</span>
          </li>
          <li className="termsPage-item" onClick={handleNavigateToPrivacyPolicy}>
            <span className="termsPage-text">개인정보 처리방침</span>
            <span className="termsPage-arrow">{'>'}</span>
          </li>
          <li className="termsPage-item" onClick={handleNavigateToOperationPolicy}>
            <span className="termsPage-text">운영정책</span>
            <span className="termsPage-arrow">{'>'}</span>
          </li>
          <li className="termsPage-item" onClick={handleNavigateToLocationTerms}>
            <span className="termsPage-text">위치기반서비스 이용 약관</span>
            <span className="termsPage-arrow">{'>'}</span>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
