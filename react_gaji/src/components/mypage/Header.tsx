import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import '../../style/Header.css';
import bellIcon from '../../assets/icons/bell-icon.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  // 마이페이지로 이동
  const handleNavigateToMain = () => {
    navigate('/mypage');
  };

  // 알림 페이지로 이동
  const handleNavigateToAlarm = () => {
    navigate('/mypage_alarm'); // 알림 페이지로 이동
  };

  return (
    <header className="header-container">
      <button className="header-title-btn" onClick={handleNavigateToMain}>
        <h1 className="header-title">나의 가지</h1>
      </button>
      <button
        className="header-notification-btn"
        onClick={handleNavigateToAlarm} // 여기 추가
      >
        <img src={bellIcon} alt="알림 아이콘" className="header-bell-icon" />
      </button>
    </header>
  );
};

export default Header;
