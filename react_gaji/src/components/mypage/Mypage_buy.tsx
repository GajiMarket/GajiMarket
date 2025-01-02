import React, { useState } from "react";
import "../../style/Mypage_buy.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

// 이미지 경로를 import로 불러오기
import paddingImage from "../../assets/images/padding-image.png";

interface Item {
  id: number;
  name: string;
  price: string;
  location: string;
  time: string;
  status: string;
}

const MypageBuy: React.FC = () => {
  const [items] = useState<Item[]>([
    { id: 1, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "거래완료" },
    { id: 2, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "거래완료" },
    { id: 3, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "거래완료" },
    { id: 4, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "거래완료" },
  ]);

  return (
    <div className="Mypage_buy">
      <Header />
      <div className="mypage-buy">
        <h1>구매내역</h1>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <img src={paddingImage} alt={item.name} className="item-image" />
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>{item.location} · {item.time}</p>
                <p className="price">{item.price}</p>
              </div>
              <div className="item-actions">
                <button className="status-button">{item.status}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default MypageBuy;
