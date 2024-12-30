import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Mypage_profileedit.css';
import bellIcon from '../assets/icons/bell-icon.png';
import smileIcon from '../assets/icons/smile-icon.png';
import locationIcon from '../assets/icons/location-icon.png';
import gearIcon from '../assets/icons/gear-icon.png';
import keywordIcon from '../assets/icons/keyword-icon.png';
import headsetIcon from '../assets/icons/headset-icon.png';
import termsIcon from '../assets/icons/terms-icon.png';
import homeIcon from '../assets/icons/home-icon.png';
import listIcon from '../assets/icons/list-icon.png';
import plusIcon from '../assets/icons/plus-icon.png';
import chatIcon from '../assets/icons/chat-icon.png';
import infoIcon from '../assets/icons/info-icon.png';
import arrowIcon from '../assets/icons/arrow.png';

const MypageProfileEdit: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToMain = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  const handleLogout = () => {
    alert('로그아웃 되었습니다.'); // 로그아웃 메시지 표시
  };

  return (
    <div className="profileedit-container">
      <header className="profileedit-header">
        <h1 className="profileedit-title" onClick={handleNavigateToMain}>
          나의 가지
        </h1>
        <button className="profileedit-notification-icon">
          <img src={bellIcon} alt="알림 아이콘" />
        </button>
      </header>
      <div className="profileedit-section">
        <div className="profileedit-previous">
            <button className="profileedit-previous-button"> 이전 </button>
        </div>
        <div className="profileedit-image-wrapper">
          <div className="profileedit-image">
            <img className="profileedit-smile-icon" src={smileIcon} alt="프로필 이미지" />
          </div>
          <div className="profileedit-image-edit-wrapper">
            <button className="profileedit-image-edit-btn">이미지 변경</button>
          </div>
        </div>
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
      <div className="profileedit-logout-section">
        <button className="profileedit-logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <footer className="profileedit-footer-background">
        <div className="profileedit-footer-item">
          <img src={homeIcon} alt="홈" />
          <span>홈</span>
        </div>
        <div className="profileedit-footer-item">
          <img src={listIcon} alt="리스트" />
          <span>리스트</span>
        </div>
        <div className="profileedit-footer-item">
          <img src={plusIcon} alt="등록" />
          <span>등록</span>
        </div>
        <div className="profileedit-footer-item">
          <img src={chatIcon} alt="채팅" />
          <span>채팅</span>
        </div>
        <div className="profileedit-footer-item profileedit-active">
          <img src={infoIcon} alt="내정보" />
          <span>내정보</span>
        </div>
      </footer>
    </div>
  );
};

export default MypageProfileEdit;
