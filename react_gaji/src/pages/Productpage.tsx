import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Productpage.css";

// 이미지 경로 추가
import heartUnfillIcon from "../assets/icons/heart-unfill-icon.png";
import heartFullIcon from "../assets/icons/heart-full-icon.png";

interface Product {
  title: string;
  description: string;
  price: string;
  location: string;
  images: File[];
  representativeImage: File | null;
  sellerName: string;
}

const ProductPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product: Product = location.state || {
    title: "기본 상품 제목",
    description: "기본 상품 설명",
    price: "0",
    location: "기본 장소",
    images: [],
    representativeImage: null,
    sellerName: "홍길동",
  };

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const mainImage = product.representativeImage
    ? URL.createObjectURL(product.representativeImage)
    : product.images.length > 0
      ? URL.createObjectURL(product.images[0])
      : "";

  // 메인 화면으로 돌아가는 함수
  const goBackToMain = () => {
    navigate("/"); // "Main" 경로로 이동
  };

  // 채팅 메세지 함수
  const handleChatClick = (chatRoomId: number, memberNo: number) => {
    navigate(`/chatpage/${chatRoomId}?memberNo=${memberNo}`);
  };

  return (
    <div className="product-page-container">
      <div className="product-image-slider" style={{ position: "relative" }}>
        <img src={mainImage} alt="대표 이미지" className="slider-image" />
        {/* 화살표 버튼 */}
        <div
          className="back-button"
          onClick={goBackToMain}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "50%",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          🔙
        </div>
      </div>

      <div className="seller-info-section">
        <div className="profile-icon">👤</div>
        <div className="seller-details">
          <span className="seller-name">{product.sellerName}</span>
          <span className="location">{product.location}</span>
        </div>
      </div>

      <div className="product-info-section">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
      </div>

      <div className="product-actions">
        <div className="price-like-container">
          {/* 좋아요 아이콘 */}
          <button
            className="like-button"
            onClick={toggleLike}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <img
              src={liked ? heartFullIcon : heartUnfillIcon}
              alt="좋아요 아이콘"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
          {/* 가격 */}
          <span className="product-price">
            {parseInt(product.price).toLocaleString()}원
          </span>
        </div>
        <button className="chat-button" onClick={() => handleChatClick(1, 12)}>채팅하기</button> {/* 예시로 chatRoomId와 memberNo를 하드코딩 */}
      </div>
    </div>
  );
};

export default ProductPage;
