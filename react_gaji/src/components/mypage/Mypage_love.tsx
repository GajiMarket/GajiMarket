import React, { useState } from "react";
import "../../style/Mypage_love.css";

import Header from './Header.tsx';
import Footer from '../all/Footer.tsx';


// 이미지 경로를 import로 불러오기
import paddingImage from "../../assets/images/padding-image.png";
import heartFullIcon from "../../assets/icons/heart-full-icon.png";
import heartUnfillIcon from "../../assets/icons/heart-unfill-icon.png";

interface Item {
  id: number;
  name: string;
  price: string;
  location: string;
  distance: string;
  time: string;
  liked: boolean;
}

const MypageLove: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "패딩팔아요~~", price: "60,000원", location: "가산동", distance: "4.5km", time: "10분전", liked: false },
    { id: 2, name: "패딩팔아요~~", price: "60,000원", location: "가산동", distance: "4.5km", time: "10분전", liked: false },
    { id: 3, name: "패딩팔아요~~", price: "60,000원", location: "가산동", distance: "4.5km", time: "10분전", liked: false },
    { id: 4, name: "패딩팔아요~~", price: "60,000원", location: "가산동", distance: "4.5km", time: "10분전", liked: false },
  ]);

  const toggleLike = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handleChat = (id: number) => {
    alert(`상품 ${id}와 채팅을 시작합니다!`); // 채팅 시작 동작 추가 (임시)
  };

  return (
    <div className="Mypage_love">
        <Header />
        <div className="mypage-love">
            <h1>관심목록</h1>
            <ul className="item-list">
                {items.map((item) => (
                <li key={item.id} className="item">
                    <img src={paddingImage} alt={item.name} className="item-image" />
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
                    <div className="chat-action">
                        <button
                        className="chat-button"
                        onClick={() => handleChat(item.id)}
                        >
                        채팅하기
                        </button>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <Footer />
    </div>
  );
};

export default MypageLove;
