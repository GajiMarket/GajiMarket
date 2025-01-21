import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import "../style/Productpage.css";
import heartUnfillIcon from "../assets/icons/heart-unfill-icon.png";
import heartFullIcon from "../assets/icons/heart-full-icon.png";
// import productStroe from "../utils/productStore";
import ProductDetailMap from "../components/map/ProductDetailMap";

interface Product {
  product_id: number;
  title: string;
  description: string;
  sell_price: number;
  status: string;
  location: string;
  // images: string[];
  images: string[];
  profile_image: string;
  member_no: number;
  member_nick: string;
  created_at: string;
  view_count: number;
}

type ProductTbl = Partial<Product>;

const ProductPage: React.FC = () => {
  // const {profileNick, setProfileNick, userLocation, userMarker, setUserMarker, setUserLocation} = productStroe();

  // const { nickname } = loginStore();

  // URL에서 productId 가져오기
  const { productId } = useParams<{ productId: string }>();

  // navigate로 전달된 state 가져오기
  const navigate = useNavigate();
  // const images = useLocation();

  // 상태 관리
  const [product, setProduct] = useState<ProductTbl | null>(null);
  const [liked, setLiked] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  // const [profileImage, setProfileImage] = useState<string | null>('');

  // const {productLocations, fetchProductLocations, renderMarkers} = useMarkers();


  // 백엔드에서 상품 상세 정보 가져오기 (productId가 있을 때만 실행)

  useEffect(() => {
    if (productId) {
      // console.log("productId에서 가지온 id:", productId);

      const fetchProductDetail = async () => {
        try {
          // console.log("productId 값:", productId);

          const response = await axios.get(
            `http://localhost:3000/product/${productId}`
          );

          // console.log("가져온 response:", response.data.data);
          // console.log("프로필 이미지:", response.data.data.profile_image);
          // console.log("판매자 위치:", response.data.data.location);

          const result = response.data.data;

          setProduct(result as ProductTbl);
        } catch (error) {
          console.error("Error fetching product details:", error);
          navigate("/productlistpage");
        }
      };

      fetchProductDetail();
    }
  }, [productId, navigate]);


  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  // 상품 데이터가 없을 때 삼항 연산자 사용
  if (!productId) {
    return (
      <div className="product?-page-container">
        <h1>상품을 찾을 수 없습니다.</h1>
        <button onClick={() => navigate("/productlistpage")}>
          상품 리스트로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="product-page-total">
      {/* 상단 고정 헤더 */}
      {/* <div className="productpage-header-container">
        <button
          className="back-button"
          onClick={() => navigate("/productlistpage")}
        >
          ←
        </button>
        <h1 className="header-title">상품 상세 페이지</h1>
      </div> */}
      
      <div className="product-page-container">
        {/* <div className="productpage-header-margin"></div> */}
        {/* 상품 이미지 슬라이더 */}
        <div className="product-image-slider" style={{ position: "relative" }}>
          {product?.images && product.images.length > 0 ? (
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
          ) : (
            <div className="image-placeholder">이미지 없음</div>
          )}
        </div>

        {/* 판매자 정보 */}
        <div className="seller-info-section">
          <div className="profile-icon">
            {product?.profile_image ? (
              <img src={product?.profile_image} alt="프로필 이미지" />
            ) : (
              "👤"
            )}
          </div>
          <div className="seller-details">
            <span className="seller-name">{product?.member_nick}</span>
            {/* <span className="location">{product?.location}</span> */}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="product-info-section">
          <h1 className="product-title">{product?.title || "상품 제목 없음"}</h1>
          <p className="product-description">
            {product?.description || "상품 설명이 없습니다."}
          </p>
        </div>

        {/* 위치 */}
        {product?.location && (
          <div className="sell_location_map">
            <div className="sell_location_map_textcontainer"><p>거래희망장소</p></div>
            <button>
              <ProductDetailMap locationData={product?.location} />
            </button>
          </div>
        )}
                <div className="productpage-footer-margin"></div>
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
        <button
          className="chat-button"
          onClick={() => navigate(`/chatpage/${product?.product_id}?name=${encodeURIComponent(product?.member_nick || '')}&memberNo=${product?.member_no}&productId=${product?.product_id}`)}
        >
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
