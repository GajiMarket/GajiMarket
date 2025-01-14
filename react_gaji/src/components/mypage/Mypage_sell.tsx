import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link 사용
import "../../style/Mypage_sell.css";

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

const MypageSell: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "거래완료" },
    { id: 2, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "판매 중" },
    { id: 3, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "거래완료" },
    { id: 4, name: "패딩팔아요~~", price: "60,000원", location: "가산동", time: "1일 전", status: "판매 중" },
  ]);

  const toggleStatus = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "거래완료" ? "판매 중" : "거래완료" }
          : item
      )
    );
  };

  return (
    <div className="Mypage_sell">
      <Header />
      <div className="mypage-sell">
        <h1>판매내역</h1>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <Link to={`/productpage/${item.id}`} className="item-link">
                <img src={paddingImage} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h2>{item.name}</h2>
                  <p>
                    {item.location} · {item.time}
                  </p>
                  <p className="price">{item.price}</p>
                </div>
              </Link>
              <div className="item-actions">
                <button
                  className={`status-button ${
                    item.status === "판매 중" ? "status-selling" : "status-complete"
                  }`}
                  onClick={() => toggleStatus(item.id)}
                >
                  {item.status}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default MypageSell;
