// Mypage_sell.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link 사용
import "../../style/Mypage_sell.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

// 이미지 경로를 import로 불러오기
import carrierImage from "../../assets/images/carrier-image.jpg"; // 업로드된 캐리어 이미지
import computerImage from "../../assets/images/computer-image.jpg"; // 업로드된 컴퓨터 이미지
import vocaImage from "../../assets/images/voca-image.jpg"; // 업로드된 VOCA 책 이미지
import paddingImage from "../../assets/images/onepiece-image.jpg"; // 원피스

interface Item {
  id: number;
  name: string;
  price: string;
  location: string;
  time: string;
  status: string;
  image: string; // 이미지 경로를 추가
}

const MypageSell: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "여행용 캐리어 팝니다",
      price: "70,000원",
      location: "가산동",
      time: "1일 전",
      status: "판매 중",
      image: carrierImage, // 캐리어 이미지
    },
    {
      id: 2,
      name: "게이밍용 컴퓨터 팝니다",
      price: "600,000원",
      location: "가산동",
      time: "2일 전",
      status: "판매 중",
      image: computerImage, // 컴퓨터 이미지
    },
    {
      id: 3,
      name: "토익 VOCA 책",
      price: "10,000원",
      location: "가산동",
      time: "14일 전",
      status: "거래완료",
      image: vocaImage, // VOCA 책 이미지
    },
    {
      id: 4,
      name: "니트 원피스 팝니다",
      price: "25,000원",
      location: "가산동",
      time: "21일 전",
      status: "거래완료",
      image: paddingImage, // 기존 패딩 이미지
    },
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
                <img src={item.image} alt={item.name} className="item-image" />
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
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageSell;
