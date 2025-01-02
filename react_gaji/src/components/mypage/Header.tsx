import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import '../../style/Header.css';
import bellIcon from '../../assets/icons/bell-icon.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToMain = () => {
    navigate('/mypage'); // 마이 페이지로 이동
  };

  return (
    <header className="header-container">
      <button className="header-title-btn" onClick={handleNavigateToMain}>
        <h1 className="header-title">나의 가지</h1>
      </button>
      <button className="header-notification-btn">
        <img src={bellIcon} alt="알림 아이콘" className="header-bell-icon" />
      </button>
    </header>
  );
};

export default Header;
