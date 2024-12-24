import React from 'react'
import '../../style/Footer.css'
import homeicon from '../../img/home.png';
const Footer:React.FC = () => {
  return (
    <div className='FooterBar'>
      <div className='footer_home_icon'><img src={homeicon} alt="Example" className='footer_home_icon_img'/>홈</div>
      <div className='footer_list_icon'>리스트</div>
      <div className='footer_join_icon'>등록</div>
      <div className='footer_chat_icon'>채팅</div>
      <div className='footer_my_icon'>내정보</div>
    </div>
  )
}

export default Footer
