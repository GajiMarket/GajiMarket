import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Productpage.css";
import heartUnfillIcon from "../assets/icons/heart-unfill-icon.png";
import heartFullIcon from "../assets/icons/heart-full-icon.png";

interface Product {
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  representativeImage: string | null;
  sellerName: string;
}

const ProductPage: React.FC = () => {
  // URL에서 productId 가져오기
  const { productId } = useParams<{ productId: string }>();

  // navigate로 전달된 state 가져오기
  const location = useLocation();
  const navigate = useNavigate();
  const initialProduct = location.state as Product | null;

  // 상태 관리
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [liked, setLiked] = useState(false);
  const [profileImage, setImage] = useState<string | null>(null);

  // 백엔드에서 상품 상세 정보 가져오기 (productId가 있을 때만 실행)
  useEffect(() => {
    if (!product && productId) {
      const fetchProductDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/products/${productId}`);
          setProduct(response.data.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
          navigate("/productlistpage");
        }
      };

      fetchProductDetail();
    }
  }, [product, productId]);

  // 프로필 이미지 불러오기
  useEffect(() => {
    if (product?.sellerName) {
      const profileDefault = async () => {
        try {
          const response = await axios.get(`/profile/image/${product.sellerName}`);
          setImage(response.data.imagePath);
        } catch {
          console.error("이미지 불러오기 실패");
        }
      };

      profileDefault();
    }
  }, [product?.sellerName]);

  // 상품 데이터가 없을 때 삼항 연산자 사용
  if (!product) {
    return (
      <div className="product-page-container">
        <h1>상품을 찾을 수 없습니다.</h1>
        <button onClick={() => navigate("/")}>메인 페이지로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      {/* 상품 이미지 슬라이더 */}
      <div className="product-image-slider" style={{ position: "relative" }}>
        <img
          src={product.representativeImage || product.images[0]}
          alt="대표 이미지"
          className="slider-image"
        />
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
          {profileImage ? <img src={profileImage} alt="프로필 이미지" /> : "👤"}
        </div>
        <div className="seller-details">
          <span className="seller-name">{product.sellerName}</span>
          <span className="location">{product.location}</span>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="product-info-section">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
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
          <span className="product-price">{product.price.toLocaleString()}원</span>
        </div>
        <button className="chat-button" onClick={() => navigate("/chatpage")}>
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default ProductPage;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../style/Productpage.css";
// import heartUnfillIcon from "../assets/icons/heart-unfill-icon.png";
// import heartFullIcon from "../assets/icons/heart-full-icon.png";

// interface Product {
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   images: string[];
//   representativeImage: string | null;
//   sellerName: string;
// }

// const ProductPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [liked, setLiked] = useState(false);
//   const [profileImage, setImage] = useState<string | null>(null);

//   // 🔥 백엔드에서 상품 상세 정보 가져오기
//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const response = await axios.get(`/product/detail/${productId}`);
//         setProduct(response.data.data); // 백엔드에서 반환된 상품 데이터 설정
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         navigate("/"); // 에러 시 메인 페이지로 이동
//       }
//     };

//     fetchProductDetail();
//   }, [productId, navigate]);

//   // 🌟 프로필 이미지 불러오기
//   useEffect(() => {
//     const profileDefault = async () => {
//       try {
//         const response = await axios.get(`/profile/image/${product?.sellerName}`);
//         setImage(response.data.imagePath);
//       } catch {
//         console.error("이미지 불러오기 실패 500");
//       }
//     };

//     profileDefault();
//   }, [product?.sellerName]);

//   // 상품 데이터가 없을 때 처리
//   if (!product) {
//     return (
//       <div className="product-page-container">
//         <h1>상품을 찾을 수 없습니다.</h1>
//         <button onClick={() => navigate("/")}>메인 페이지로 돌아가기</button>
//       </div>
//     );
//   }

//   // 채팅 메세지 함수
//   const handleChatClick = (chatRoomId: number, memberNo: number) => {
//     navigate(`/chatpage/${chatRoomId}?memberNo=${memberNo}`);
//   };

//   return (
//     <div className="product-page-container">
//       <div className="product-image-slider" style={{ position: "relative" }}>
//         <img src={product.representativeImage || product.images[0]} alt="대표 이미지" className="slider-image" />
//         <div
//           className="back-button"
//           onClick={() => navigate("/")}
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "10px",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             padding: "10px",
//             borderRadius: "50%",
//             color: "white",
//             fontSize: "24px",
//             cursor: "pointer",
//           }}
//         >
//           🔙
//         </div>
//       </div>

//       <div className="seller-info-section">
//         <div className="profile-icon">
//           {profileImage ? <img src={profileImage} alt="프로필 이미지" /> : "👤"}
//         </div>
//         <div className="seller-details">
//           <span className="seller-name">{product.sellerName}</span>
//           <span className="location">{product.location}</span>
//         </div>
//       </div>

//       <div className="product-info-section">
//         <h1 className="product-title">{product.title}</h1>
//         <p className="product-description">{product.description}</p>
//       </div>

//       <div className="product-actions">
//         <div className="price-like-container">
//           <button
//             className="like-button"
//             onClick={() => setLiked(!liked)}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               padding: "0",
//             }}
//           >
//             <img
//               src={liked ? heartFullIcon : heartUnfillIcon}
//               alt="좋아요 아이콘"
//               style={{ width: "24px", height: "24px" }}
//             />
//           </button>
//           <span className="product-price">
//             {product.price.toLocaleString()}원
//           </span>
//         </div>
//         <button className="chat-button" onClick={() => handleChatClick(1, 12)}>채팅하기</button> {/* 예시로 chatRoomId와 memberNo를 하드코딩 */}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
