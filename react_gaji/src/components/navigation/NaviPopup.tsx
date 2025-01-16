import React from "react";

import '../../style/NaviPopup.css'

interface PopupProps {
    totalLength: number; // 총 거리
    totalTime: number; // 총 소요 시간
}

const NaviPopup: React.FC<PopupProps> = ({ totalLength, totalTime }) => {
    return (
        <div className="popup-container">
            <h3>경로 정보</h3>
            <div className="popup-content">
                <p>총 거리: {totalLength.toFixed(2)} m</p>
                <p>총 소요 시간: {totalTime} 초</p>
            </div>
        </div>
    );
};

export default NaviPopup;
