// ProductPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Productpage.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  seller: string;
  imageUrl: string;
  mapUrl: string;
}

// 전달된 상품 데이터 가져오기
const ProductPage: React.FC = () => {
  const location = useLocation();
  const product: Product = location.state || {
    title: "기본 상품 제목",
    description: "기본 상품 설명",
    price: "0",
    location: "기본 장소",
    seller: "판매자 미지정",
    imageUrl: "/path/to/default-image.jpg", // 기본 이미지 경로
  };

  return (
    <div className="product-page-container">
      <div className="product-image-section">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-info-section">
        <div className="seller-info">
          <span className="seller-name">{product.seller}</span>
          <span className="product-location">{product.location}</span>
        </div>

        <h1 className="product-title">{product.title}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
      </div>

      <div className="product-actions">
        <div className="product-price">{product.price.toLocaleString()}원</div>
        <button className="chat-button">채팅하기</button>
      </div>
    </div>
  );
};

export default ProductPage;
