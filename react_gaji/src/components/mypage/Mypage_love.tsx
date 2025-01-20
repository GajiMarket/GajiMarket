// Mypage_love.tsx

import React, { useState } from "react";
import "../../style/Mypage_love.css";

import Header from "./Header.tsx";
import Footer from "../all/Footer.tsx";

// 이미지 경로를 import로 불러오기
import paddingImage from "../../assets/images/padding-image.png"; // 패딩 이미지
import bagImage from "../../assets/images/bag-image.jpg"; // 업로드된 배낭 이미지
import speakerImage from "../../assets/images/speaker-image.jpg"; // 업로드된 스피커 이미지
import heartFullIcon from "../../assets/icons/heart-full-icon.png"; // 좋아요 아이콘
import heartUnfillIcon from "../../assets/icons/heart-unfill-icon.png"; // 좋아요 취소 아이콘

interface Item {
  id: number;
  name: string;
  price: string;
  location: string;
  distance: string;
  time: string;
  liked: boolean;
  image: string; // 이미지 경로를 위한 속성 추가
}

const MypageLove: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "패딩팔아요~~",
      price: "60,000원",
      location: "가산동",
      distance: "2.0km",
      time: "10분전",
      liked: false,
      image: paddingImage, // 패딩 이미지
    },
    {
      id: 2,
      name: "여행용 배낭",
      price: "20,000원",
      location: "가산동",
      distance: "3.5km",
      time: "1시간전",
      liked: false,
      image: bagImage, // 배낭 이미지
    },
    {
      id: 3,
      name: "블루투스 스피커",
      price: "5,000원",
      location: "가산동",
      distance: "4.5km",
      time: "2시간전",
      liked: false,
      image: speakerImage, // 스피커 이미지
    },
  ]);

  const toggleLike = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  return (
    <div className="Mypage_love">
      <Header />
      <div className="mypage-love">
        <h1>관심목록</h1>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>{item.distance} · {item.location} · {item.time}</p>
                <p className="price">{item.price}</p>
              </div>
              <div className="item-actions">
                <div className="heart-action">
                  <button
                    className="heart-button"
                    onClick={() => toggleLike(item.id)}
                  >
                    <img
                      src={item.liked ? heartUnfillIcon : heartFullIcon}
                      alt="like"
                      className="heart-icon"
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer currentPage={4} />
    </div>
  );
};

export default MypageLove;
