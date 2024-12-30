import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Mypage.css';
import bellIcon from '../assets/icons/bell-icon.png';
import smileIcon from '../assets/icons/smile-icon.png';
import heartIcon from '../assets/icons/heart-icon.png';
import clipboardIcon from '../assets/icons/clipboard-icon.png';
import bagIcon from '../assets/icons/bag-icon.png';
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

const Mypage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToMain = () => {
    navigate('/');
  };

  const handleProfileEdit = () => {
    navigate('/mypage_profileedit');
  };

  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
  };

  return (
    <div className="mypage-container">
      <header className="mypage-header">
        <button className="cursor-pointer mypage-title-btn" onClick={handleNavigateToMain}>
          <h1 className="mypage-title">나의 가지</h1>
        </button>
        <button className="notification-icon cursor-pointer">
          <img src={bellIcon} alt="알림 아이콘" />
        </button>
      </header>
      <div className="profile-section">
        <div className="profile-info">
          <img className="smile-icon cursor-pointer" src={smileIcon} alt="프로필 이미지" />
          <div className="profile-name">홍길동</div>
        </div>
        <button className="profile-edit-btn cursor-pointer" onClick={handleProfileEdit}>
          프로필 수정
        </button>
      </div>
      <section className="mypage-menu">
        <div className="menu-group">
          <h2>나의 거래</h2>
          <ul>
            <li>
              <span className="cursor-pointer">
                <img src={heartIcon} alt="관심목록" /> 관심목록
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
            <li>
              <span className="cursor-pointer">
                <img src={clipboardIcon} alt="판매내역" /> 판매내역
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
            <li>
              <span className="cursor-pointer">
                <img src={bagIcon} alt="구매내역" /> 구매내역
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
          </ul>
        </div>
        <div className="menu-group">
          <h2>설정</h2>
          <ul>
            <li>
              <span className="cursor-pointer">
                <img src={locationIcon} alt="나의동네설정" /> 나의동네설정
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
            <li>
              <span className="cursor-pointer">
                <img src={gearIcon} alt="나의동네인증" /> 나의동네인증
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
            <li>
              <span className="cursor-pointer">
                <img src={keywordIcon} alt="키워드알림설정" /> 키워드알림설정
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
          </ul>
        </div>
        <div className="menu-group">
          <h2>고객지원</h2>
          <ul>
            <li>
              <span className="cursor-pointer">
                <img src={headsetIcon} alt="고객센터" /> 고객센터
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
            <li>
              <span className="cursor-pointer">
                <img src={termsIcon} alt="이용 및 약관" /> 이용 및 약관
              </span>
              <img src={arrowIcon} alt="화살표" className="menu-arrow cursor-pointer" />
            </li>
          </ul>
        </div>
      </section>
      <div className="logout-section">
        <button className="logout-btn cursor-pointer" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <footer className="footer-background">
        <div className="footer-item cursor-pointer">
          <img src={homeIcon} alt="홈" />
          <span>홈</span>
        </div>
        <div className="footer-item cursor-pointer">
          <img src={listIcon} alt="리스트" />
          <span>리스트</span>
        </div>
        <div className="footer-item cursor-pointer">
          <img src={plusIcon} alt="등록" />
          <span>등록</span>
        </div>
        <div className="footer-item cursor-pointer">
          <img src={chatIcon} alt="채팅" />
          <span>채팅</span>
        </div>
        <div className="footer-item cursor-pointer active">
          <img src={infoIcon} alt="내정보" />
          <span>내정보</span>
        </div>
      </footer>
    </div>
  );
};

export default Mypage;
