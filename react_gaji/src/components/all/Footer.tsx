import React, { useEffect } from 'react';
import { useFooter } from './FooterContext.tsx';
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
import { useNavigate,useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const { activeIndex, setActiveIndex } = useFooter();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveIndex(0);
    }
  }, [location, setActiveIndex]);

  return (
    <div className='FooterBar'>
      <button
        className={`footer_home_icon ${activeIndex === 0 ? 'active' : ''}`}
        onClick={() => handleNavigation(0, '/map')}
      >
        <img src={activeIndex === 0 ? homeicon : nc_homeicon} alt="Example" className='footer_home_icon_img' />홈
      </button>
      <button
        className={`footer_list_icon ${activeIndex === 1 ? 'active' : ''}`}
        onClick={() => handleNavigation(1, '/productlistpage')}
      >
        <img src={activeIndex === 1 ? listicon : nc_listicon} alt="Example" className='footer_list_icon_img' />리스트
      </button>
      <button
        className="footer_join_icon"
        onClick={() => handleNavigation(2, '/productadd')}
      >
        <img src={nc_joinicon} alt="Example" className='footer_join_icon_img' />등록
      </button>
      <button
        className={`footer_chat_icon ${activeIndex === 3 ? 'active' : ''}`}
        onClick={() => handleNavigation(3, '/chatlist')}
      >
        <img src={activeIndex === 3 ? chaticon : nc_chaticon} alt="Example" className='footer_chat_icon_img' />채팅
      </button>
      <button
        className={`footer_my_icon ${activeIndex === 4 ? 'active' : ''}`}
        onClick={() => handleNavigation(4, '/mypage')}
      >
        <img src={activeIndex === 4 ? mypageicon : nc_mypageicon} alt="Example" className='footer_my_icon_img' />내정보
      </button>
    </div>
  );
};

export default Footer;