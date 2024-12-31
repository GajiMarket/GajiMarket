import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Mypage_profileedit.css';
import Header from '../components/mypage/Header.tsx'; // Header 불러오기
import Footer from '../components/all/Footer.tsx';


import smileIcon from '../assets/icons/smile-icon.png';
import locationIcon from '../assets/icons/location-icon.png';
import gearIcon from '../assets/icons/gear-icon.png';
import keywordIcon from '../assets/icons/keyword-icon.png';
import headsetIcon from '../assets/icons/headset-icon.png';
import termsIcon from '../assets/icons/terms-icon.png';
import arrowIcon from '../assets/icons/arrow.png';

const MypageProfileEdit: React.FC = () => {
  const navigate = useNavigate();

  // const handleNavigateToMain = () => {
  //   navigate('/mypage'); // 마이 페이지로 이동
  // };


  const handleLogout = () => {
    alert('로그아웃 되었습니다.'); // 로그아웃 메시지 표시
  };

  return (
    <div className="Mypage_profileedit">
      <div className="profileedit-container">
      <Header /> {/* Header 컴포넌트 사용 */}
        <div className="profileedit-section">

          {/* 프로필 이미지 변경 섹션 */}
          <div className="profileedit-image-wrapper">
            <div className="profileedit-image">
              <img className="profileedit-smile-icon" src={smileIcon} alt="프로필 이미지" />
            </div>
            <div className="profileedit-image-edit-wrapper">
              <button className="profileedit-image-edit-btn">이미지 변경</button>
            </div>
          </div>
          {/* 닉네임 변경 섹션 */}
          <div className="profileedit-nickname-section">
            <label htmlFor="nickname" className="profileedit-nickname-label">닉네임</label>
            <div className="profileedit-nickname-input-group">
              <input
                type="text"
                id="nickname"
                value="홍길동"
                readOnly
                className="profileedit-nickname-input"
              />
              <button className="profileedit-nickname-edit-btn">닉네임 변경</button>
            </div>
          </div>
        </div>
        {/* 설정 및 고객지원 섹션 */}
        <div className="profileedit-settings-container">
          <div className="profileedit-settings-group">
            <h2>설정</h2>
            <ul>
              <li>
                <span>
                  <img src={locationIcon} alt="나의동네설정" /> 나의동네설정
                </span>
                <img src={arrowIcon} alt="화살표" className="profileedit-menu-arrow" />
              </li>
              <li>
                <span>
                  <img src={gearIcon} alt="나의동네인증" /> 나의동네인증
                </span>
                <img src={arrowIcon} alt="화살표" className="profileedit-menu-arrow" />
              </li>
              <li>
                <span>
                  <img src={keywordIcon} alt="키워드알림설정" /> 키워드알림설정
                </span>
                <img src={arrowIcon} alt="화살표" className="profileedit-menu-arrow" />
              </li>
            </ul>
          </div>
          <div className="profileedit-support-group">
            <h2>고객지원</h2>
            <ul>
              <li>
                <span>
                  <img src={headsetIcon} alt="고객센터" /> 고객센터
                </span>
                <img src={arrowIcon} alt="화살표" className="profileedit-menu-arrow" />
              </li>
              <li>
                <span>
                  <img src={termsIcon} alt="이용 및 약관" /> 이용 및 약관
                </span>
                <img src={arrowIcon} alt="화살표" className="profileedit-menu-arrow" />
              </li>
            </ul>
          </div>
        </div>
        {/* 로그아웃 버튼 */}
        <div className="profileedit-logout-section">
          <button className="profileedit-logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageProfileEdit;
