import React from 'react';
// import { useFooter } from './FooterContext.tsx';
import '../../style/Footer.css';
import homeicon from '../../img/home.png';
import nc_homeicon from '../../img/no_color_home.png';
import listicon from '../../img/list.png';
import nc_listicon from '../../img/no_color_list.png';
import nc_joinicon from '../../img/no_color_join.png';
import chaticon from '../../img/chat.png';
import nc_chaticon from '../../img/no_color_chat.png';
import mypageicon from '../../img/mypage.png';
import nc_mypageicon from '../../img/no_color_mypage.png';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  currentPage: number;
}

const Footer: React.FC<FooterProps> = ({ currentPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (index: number, path: string) => {
    navigate(path);
  };

  return (
    <div className='FooterBar'>
      <button
        className={`footer_home_icon ${currentPage === 0 ? 'active' : ''}`}
        onClick={() => handleNavigation(0, '/map')}
      >
        <img src={currentPage === 0 ? homeicon : nc_homeicon} alt="홈" className='footer_home_icon_img' />홈
      </button>
      <button
        className={`footer_list_icon ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handleNavigation(1, '/productlistpage')}
      >
        <img src={currentPage === 1 ? listicon : nc_listicon} alt="리스트" className='footer_list_icon_img' />리스트
      </button>
      <button
        className={`footer_join_icon ${currentPage === 2 ? 'active' : ''}`}
        onClick={() => handleNavigation(2, '/productadd')}
      >
        <img src={nc_joinicon} alt="등록" className='footer_join_icon_img' />등록
      </button>
      <button
        className={`footer_chat_icon ${currentPage === 3 ? 'active' : ''}`}
        onClick={() => handleNavigation(3, '/chatlist')}
      >
        <img src={currentPage === 3 ? chaticon : nc_chaticon} alt="채팅" className='footer_chat_icon_img' />채팅
      </button>
      <button
        className={`footer_my_icon ${currentPage === 4 ? 'active' : ''}`}
        onClick={() => handleNavigation(4, '/mypage')}
      >
        <img src={currentPage === 4 ? mypageicon : nc_mypageicon} alt="내정보" className='footer_my_icon_img' />내정보
      </button>
    </div>
  );
};

export default Footer;