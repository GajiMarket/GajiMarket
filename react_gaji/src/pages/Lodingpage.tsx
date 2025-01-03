import React from 'react';
import eggplant from '../img/image 16.png';
import '../style/Lodingpage.css';

const Lodingpage: React.FC = () => {
    return (
        <div className="loading-screen">
      <img src={eggplant} alt="Eggplant" className="icon" />
      <h1 className="title">Gaji Market</h1>
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loading-text">로딩중</p>
    </div>
    );
}

export default Lodingpage;