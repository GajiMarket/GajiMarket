import React, { useEffect, useState } from 'react';
import '../../style/Footer.css';
import homeicon from '../../img/home.png';
import nc_homeicon from '../../img/home.png';
import listicon from '../../img/list.png';
import nc_listicon from '../../img/no_color_list.png';
import joinicon from '../../img/join.png';
import nc_joinicon from '../../img/no_color_join.png';
import chaticon from '../../img/chat.png';
import nc_chaticon from '../../img/no_color_chat.png';
import mypageicon from '../../img/mypage.png';
import nc_mypageicon from '../../img/no_color_mypage.png';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (activeIndex === 0)  {
      navigate('/');
    }
    if (activeIndex === 1)  {
      navigate('/productlistpage');
    }
    if (activeIndex === 2)  {
      navigate('/productadd');
    }
    if (activeIndex === 3)  {
      navigate('/chatlist');
    }
    if (activeIndex === 4)  {
      navigate('/mypage');
    }
  },[activeIndex])
  
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };
  

  return (
    <div className='FooterBar'>
      <button
        className={`footer_home_icon ${activeIndex === 0 ? 'active' : ''}`}
        onClick={() => handleItemClick(0)}
      >
        <img src={activeIndex === 0 ? homeicon : nc_homeicon} alt="Example" className='footer_home_icon_img' />홈
      </button>
      <button
        className={`footer_list_icon ${activeIndex === 1 ? 'active' : ''}`}
        onClick={() => handleItemClick(1)}
      >
        <img src={activeIndex === 1 ? listicon : nc_listicon} alt="Example" className='footer_list_icon_img' />리스트
      </button>
      <button
        className={`footer_join_icon ${activeIndex === 2 ? 'active' : ''}`}
        onClick={() => handleItemClick(2)}
      >
        <img src={activeIndex === 2 ? joinicon : nc_joinicon} alt="Example" className='footer_join_icon_img' />등록
      </button>
      <button
        className={`footer_chat_icon ${activeIndex === 3 ? 'active' : ''}`}
        onClick={() => handleItemClick(3)}
      >
        <img src={activeIndex === 3 ? chaticon : nc_chaticon} alt="Example" className='footer_chat_icon_img' />채팅
      </button>
      <button
        className={`footer_my_icon ${activeIndex === 4 ? 'active' : ''}`}
        onClick={() => handleItemClick(4)}
      >
        <img src={activeIndex === 4 ? mypageicon : nc_mypageicon} alt="Example" className='footer_my_icon_img' />내정보
      </button>
    </div>
  );
};

export default Footer;