import React from 'react';
import eggplant from '../img/image 16.png';
import gajimarket from '../img/gajimarket.png';
import '../style/Lodingpage.css';

const Lodingpage: React.FC = () => {
  return (
    <div className="loading_page">
      <img src={eggplant} className="eggplant_img" />
      <h1 className="gajimarket"><img src={gajimarket} className='gajimarket_img'/></h1>
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
      <p className="loading_text">로딩중</p>
    </div>
  );
}

export default Lodingpage;