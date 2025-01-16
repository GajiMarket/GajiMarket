import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Productpage.css";
import heartUnfillIcon from "../assets/icons/heart-unfill-icon.png";
import heartFullIcon from "../assets/icons/heart-full-icon.png";
import loginStore from "../utils/loginStore";

interface Product {
  product_id: number;
  title: string;
  description: string;
  sell_price: number;
  status: string;
  location: string;
  images: string[];
  member_no: number;
}

type ProductTbl = Partial<Product>;

const ProductPage: React.FC = () => {
  const { nickname } = loginStore();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductTbl | null>(null);
  const [liked, setLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(currentIndex)

  useEffect(() => {
    if (productId) {
      const fetchProductDetail = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/product/${productId}`
          );
          setProduct(response.data.data as ProductTbl);
        } catch (error) {
          console.error("Error fetching product details:", error);
          navigate("/productlistpage");
        }
      };
      fetchProductDetail();
    }
  }, [productId, navigate]);

  // 슬라이드 이동 함수
  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  if (!productId) {
    return (
      <div className="product-page-container">
        <h1>상품을 찾을 수 없습니다.</h1>
        <button onClick={() => navigate("/productlistpage")}>
          상품 리스트로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      {/* 상품 이미지 슬라이더 */}
      <div className="product-image-slider" style={{ position: "relative" }}>
        {product?.images && product.images.length > 0 && (
          <>
            <img
              src={product.images[currentIndex]}
              alt={`슬라이드 이미지 ${currentIndex + 1}`}
              className="slider-image"
            />
            <div className="dots-container">
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? "active" : ""}`}
                  onClick={() => handleSlideChange(index)}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 판매자 정보 */}
      <div className="seller-info-section">
        <div className="profile-icon">👤</div>
        <div className="seller-details">
          <span className="seller-name">{nickname}</span>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="product-info-section">
        <h1 className="product-title">{product?.title}</h1>
        <p className="product-description">{product?.description}</p>
      </div>

      {/* 좋아요 버튼 및 가격 */}
      <div className="product-actions">
        <div className="price-like-container">
          <button
            className="like-button"
            onClick={() => setLiked(!liked)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src={liked ? heartFullIcon : heartUnfillIcon}
              alt="좋아요 아이콘"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
          <span className="product-price">
            {product?.sell_price?.toLocaleString()}원
          </span>
        </div>
        <button className="chat-button" onClick={() => navigate("/chatpage")}>
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
