import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Productpage.css";

interface Product {
  title: string;
  description: string;
  price: string;
  location: string; // 상품 등록 페이지에서 전달된 장소 데이터
  images: File[];
  representativeImage: File | null;
  sellerName: string;
}

// 전달된 상품 데이터 가져오기
const ProductPage: React.FC = () => {
  const location = useLocation();
  const product: Product = location.state || {
    title: "기본 상품 제목",
    description: "기본 상품 설명",
    price: "0",
    location: "기본 장소",
    images: [],
    representativeImage: null,
    sellerName: "홍길동",
  };

  // 대표 사진과 첫 번째 이미지 설정
  const mainImage = product.representativeImage
    ? URL.createObjectURL(product.representativeImage)
    : product.images.length > 0
    ? URL.createObjectURL(product.images[0])
    : "";

  return (
    <div className="product-page-container">
      {/* 상품 이미지 */}
      <div className="product-image-slider">
        <img src={mainImage} alt="대표 이미지" className="slider-image" />
      </div>

      {/* 판매자 정보 */}
      <div className="seller-info-section">
        <div className="profile-icon">👤</div>
        <div className="seller-details">
          <span className="seller-name">{product.sellerName}</span>
          <span className="location">{product.location}</span>{" "}
          {/* 등록된 장소 데이터 */}
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="product-info-section">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
      </div>

      {/* 가격과 채팅 버튼 */}
      <div className="product-actions">
        <span className="product-price">
          {parseInt(product.price).toLocaleString()}원
        </span>
        <button className="chat-button">채팅하기</button>
      </div>
    </div>
  );
};

export default ProductPage;
