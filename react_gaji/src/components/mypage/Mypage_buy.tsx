import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link 사용
import "../../style/Mypage_buy.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

// 이미지 경로를 import로 불러오기
import starbucksGifticon from "../../assets/images/starbuck-gifticon-image.jpg";
import gamingMouse from "../../assets/images/gaming-mouse-image.jpg";
import paddingImage from "../../assets/images/padding-image.png";
import starbucksTumbler from "../../assets/images/starbuck-tumbler-image.jpg";

interface Item {
  id: number;
  name: string;
  price: string;
  location: string;
  time: string;
  status: string;
  image: string; // 이미지 경로 추가
}

const MypageBuy: React.FC = () => {
  const [items] = useState<Item[]>([
    { id: 1, name: "스타벅스 기프티콘 팝니다", price: "9,000원", location: "가산동", time: "1일 전", status: "거래완료", image: starbucksGifticon },
    { id: 2, name: "스타벅스 텀블러 팔아요", price: "20,000원", location: "가산동", time: "7일 전", status: "거래완료", image: starbucksTumbler },
    { id: 3, name: "게이밍 마우스 팝니다", price: "20,000원", location: "가산동", time: "19일 전", status: "거래완료", image: gamingMouse },
    { id: 4, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1달 전", status: "거래완료", image: paddingImage },
  ]);

  return (
    <div className="Mypage_buy">
      <Header />
      <div className="mypage-buy">
        <h1>구매내역</h1>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <Link to={`/productpage/${item.id}`} className="item-link">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h2>{item.name}</h2>
                  <p>{item.location} · {item.time}</p>
                  <p className="price">{item.price}</p>
                </div>
              </Link>
              <div className="item-actions">
                <button className="status-button">{item.status}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageBuy;
