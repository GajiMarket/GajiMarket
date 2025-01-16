import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link 사용
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

  return (
    <div className="Mypage_love">
        <Header />
        <div className="mypage-love">
            <h1>관심목록</h1>
            <ul className="item-list">
                {items.map((item) => (
                <li key={item.id} className="item">
                    {/* 상품 상세 페이지로 이동 */}
                    <Link to={`/productpage/${item.id}`} className="item-link">
                      <img src={paddingImage} alt={item.name} className="item-image" />
                      <div className="item-info">
                        <h2>{item.name}</h2>
                        <p>{item.distance} · {item.location} · {item.time}</p>
                        <p className="price">{item.price}</p>
                      </div>
                    </Link>
                    <div className="item-actions">
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
                </li>
                ))}
            </ul>
        </div>
        <Footer currentPage={4}/>
    </div>
  );
};

export default MypageLove;
