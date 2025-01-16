import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Productpage.css";
import heartUnfillIcon from "../assets/icons/heart-unfill-icon.png";
import heartFullIcon from "../assets/icons/heart-full-icon.png";
// import productStroe from "../utils/productStore";
import wellknown from 'wellknown'; 

interface Product {
  product_id: number;
  title: string;
  description: string;
  sell_price: number;
  status: string
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
  const {productId} = useParams<{ productId: string }>();

  // navigate로 전달된 state 가져오기
  const navigate = useNavigate();

  // 상태 관리
  const [product, setProduct] = useState<ProductTbl | null>(null);
  const [liked, setLiked] = useState(false);
  // const [profileImage, setProfileImage] = useState<string | null>('');

  

  // 백엔드에서 상품 상세 정보 가져오기 (productId가 있을 때만 실행)
  useEffect(() => {

    if(productId) {

      console.log("productId에서 가지온 id:", productId);
      

      const fetchProductDetail = async () => {
        try {
          console.log("productId 값:", productId);
          
          const response = await axios.get(`http://localhost:3000/product/${productId}`);

          console.log("가져온 response:",response.data.data);
          console.log("프로필 이미지:", response.data.data.profile_image);
          
         

          const result = response.data.data;

          const geojson = {
            type: 'FeatureCollection',
            features: result.map((item: ProductTbl) => ({
              type: 'Feature',
              geometry: wellknown.parse(item.location as string),
              properties: {
                title: item.title,
                description: item.description,
                status: item.status,
                sell_price: item.sell_price,
                created_at: item.created_at,
                view_count: item.view_count

              }

            }))
          };

          setProduct(result as ProductTbl);

        } catch (error) {
          console.error("Error fetching product details:", error);
          navigate("/productlistpage");
        }
      };

     

      fetchProductDetail();
    }
  }, [productId]);

  

  // 상품 데이터가 없을 때 삼항 연산자 사용
  if (!productId) {
    return (
      <div className="product-page-container">
        <h1>상품을 찾을 수 없습니다.</h1>
        <button onClick={() => navigate("/productlistpage")}>상품 리스트로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      {/* 상품 이미지 슬라이더 */}
      <div className="product-image-slider" style={{ position: "relative" }}>
        {product?.images?.map((productImage, i) => {
          return (
          <img
          key={i}
          src={productImage}
          alt="대표 이미지"
          className="slider-image"
        />
      );
        })}
        {/* <img src={product.images?.[0]} alt="대표 이미지" className="slider-image"/> */}
        <div
          className="back-button"
          onClick={() => navigate("/")}
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

      {/* 판매자 정보 */}
      <div className="seller-info-section">
        <div className="profile-icon">
          {product?.profile_image ? <img src={product?.profile_image} alt="프로필 이미지" /> : "👤"}
        </div>
        <div className="seller-details">
          <span className="seller-name">{product?.member_nick}</span>
          {/* <span className="location">{product.location}</span> */}
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="product-info-section">
        <h1 className="product-title">{product?.title}</h1>
        <p className="product-description">{product?.description}</p>
      </div>

      {/* 위치 */}
      <div className="sell_location_map">
      </div>

      {/* 좋아요 버튼 및 가격 */}
      <div className="product-actions">
        <div className="price-like-container">
          <button
            className="like-button"
            onClick={() => setLiked(!liked)}
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
          <span className="product-price">{product?.sell_price?.toLocaleString()}원</span>
        </div>
        <button className="chat-button" onClick={() => navigate("/chatpage")}>
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default ProductPage;


