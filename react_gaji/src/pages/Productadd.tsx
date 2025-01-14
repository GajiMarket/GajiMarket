import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Productadd.css";
import Mapcontainer from "../components/map/Mapcontainer";
import axios from 'axios'
import loginStore from "../utils/loginStore";

const ProductAdd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lng: number; lat: number; name :string } | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [representativeIndex, setRepresentativeIndex] = useState<number | null>(
    null
  );
  const [showMap, setShowMap] = useState(false);

  const { isAuthenticated, userNo} = loginStore();

  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...uploadedFiles];
        if (representativeIndex === null && updatedImages.length > 0) {
          setRepresentativeIndex(0);
        }
        return updatedImages;
      });
    }
  };

  const handleSetRepresentative = (index: number) => {
    setRepresentativeIndex(index);
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!title || !price || !description || !location) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    const productData = {
      title,
      price: Number(price), // 숫자로 변환
      description,
      location,
      createdAt: new Date().toISOString(), // 현재 시간
      views: 0, // 조회수 초기화
      userNo,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/productadd", productData);

      console.log("Product Saved:", response.data);
      alert("상품이 성공적으로 등록되었습니다.");
      
      // 입력 필드 초기화
      setTitle("");
      setPrice("");
      setDescription("");
      setLocation(null);
      setImages([]);
      setRepresentativeIndex(null);

      navigate("/productpage", { state: response.data });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("상품 등록 중 문제가 발생했습니다.");
    }
  };

  const handleLocationSelect = (selectedLocation: { lng: number; lat: number; name: string;}) => {
    setLocation(selectedLocation);
    console.log("productadd_88줄",selectedLocation);
    setShowMap(false);
  };

  return (
    <div className="product-add-container">
      {/* Header Section */}
      <header className="product-add-header">
        <button className="product-add-back-button">뒤로가기</button>
        <h1>내 물건 팔기</h1>
        <button className="product-add-save-draft">임시저장</button>
      </header>

      {/* Image Upload Section */}
      <section className="product-add-image-upload">
        <div className="image-list-container">
          {images.length < 10 && (
            <label className="image-upload-label">
              <div className="image-placeholder">
                <span>📷</span>
                <span>{images.length}/10</span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          )}
          {images.map((image, index) => (
            <div className="uploaded-image-wrapper" key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={`uploaded-${index}`}
                className="uploaded-image"
              />
              {representativeIndex === index && (
                <span className="representative-badge">대표사진</span>
              )}
              <button
                className="set-representative-button"
                onClick={() => handleSetRepresentative(index)}
                style={{
                  display: representativeIndex === index ? "none" : "block",
                }}
              >
                대표설정
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Product Details Form Section */}
      <form className="product-add-form" onSubmit={(e) => e.preventDefault()}>
        {/* Title Input */}
        <label className="form-label">
          <h2>제목</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="form-input"
          />
        </label>

      
          <div className="price-section">
            <label className="form-label">
              <h2>가격</h2>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="가격을 입력해주세요"
                className="form-input"
              />
            </label>
          </div>

        {/* Description Input */}
        <label className="form-label">
          상품 상세설명
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="올릴 게시글 내용을 작성해주세요."
            className="form-textarea"
          />
        </label>

        {/* Location Input */}
        <label className="form-label">
          거래 희망 장소
          <input
            type="text"
            value={location ? `${location.name}` : ""}
            onClick={() => setShowMap(true)}
            placeholder="위치 추가"
            readOnly
            className="form-input"
          />
        </label>
      </form>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit}>
        작성 완료
      </button>

      {/* Map Modal */}
      {showMap && (
        <Mapcontainer
          onClose={() => setShowMap(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default ProductAdd;