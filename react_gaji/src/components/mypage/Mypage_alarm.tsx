import React, { useState } from "react";
import "../../style/Mypage_alarm.css"; // 스타일 파일

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import binIcon from "../../assets/icons/bin-icon.png"; // 휴지통 아이콘

const MypageAlarm: React.FC = () => {
  // 알림 데이터 (state로 관리)
  const [notifications, setNotifications] = useState<string[]>([
    "키워드: 스타벅스 기프티콘 팔아요",
    "키워드: 스타벅스 다이어리 팔아요",
    "키워드: 스타벅스 텀블러 삽니다",
    "키워드: 스타벅스 기프티콘 삽니다",
  ]);

  // 알림 삭제 핸들러 (단일 항목 삭제)
  const handleDelete = (index: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  // 전체 알림 삭제 핸들러
  const handleClearAll = () => {
    setNotifications([]); // 모든 알림 삭제
  };

  return (
    <div className="mypage-alarm-container">
      <Header />
      <div className="alarm-content">
        <div className="alarm-header">
          <h2 className="alarm-title">알림내역</h2>
          <button className="clear-all-btn" onClick={handleClearAll}>
            전체삭제
          </button>
        </div>
        <ul className="alarm-list">
          {notifications.map((notification, index) => (
            <li key={index} className="alarm-item">
              <span>{notification}</span>
              <button
                className="icon-btn"
                aria-label="알림 삭제"
                onClick={() => handleDelete(index)}
              >
                <img src={binIcon} alt="휴지통 아이콘" className="icon" />
              </button>
            </li>
          ))}
        </ul>
        {notifications.length === 0 && (
          <p className="empty-message">알림이 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MypageAlarm;
