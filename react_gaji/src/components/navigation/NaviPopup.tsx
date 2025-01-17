import React from "react";
import { useNavigate } from "react-router-dom";

import '../../style/NaviPopup.css'

interface PopupProps {
    totalLength: number; // 총 거리
    totalTime: number; // 총 소요 시간
}

const NaviPopup: React.FC<PopupProps> = ({ totalLength, totalTime }) => {
    const navigate = useNavigate();

    const redirectMap = () => {
        navigate('/map');
    }
    return (
        <div className="popup-container">
            <h3>경로 정보</h3>
            <div className="popup-content">
                <p>총 거리: {totalLength.toFixed(2)} m</p>
                <p>총 소요 시간: {totalTime} 초</p>
            </div>
            <button className="popup-end-btn">도착</button>
            <button className="popup-back-btn" onClick={redirectMap}>뒤로가기</button>
        </div>
    );
};

export default NaviPopup;
