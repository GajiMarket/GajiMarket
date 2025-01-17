import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Mypage_alarm.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";
import binIcon from "../../assets/icons/bin-icon.png";

interface Notification {
  id: number; // 알림 ID
  message: string; // 알림 메시지
  productId: number; // 연관된 상품 ID
}

const MypageAlarm: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "스타벅스 기프티콘 팔아요", productId: 31 },
    { id: 2, message: "스타벅스 다이어리 팔아요", productId: 31 },
    { id: 3, message: "스타벅스 텀블러 삽니다", productId: 31 },
    { id: 4, message: "스타벅스 기프티콘 삽니다", productId: 31 },
  ]);

  const handleDelete = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
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
          {notifications.map((notification) => (
            <li key={notification.id} className="alarm-item">
              {/* 상품 상세 페이지로 연결 */}
              <Link
                to={`/productpage/${notification.productId}`}
                className="notification-link"
              >
                {notification.message}
              </Link>
              <button
                className="icon-btn"
                aria-label="알림 삭제"
                onClick={() => handleDelete(notification.id)}
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
      <Footer currentPage={4}/>
    </div>
  );
};

export default MypageAlarm;
