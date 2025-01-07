import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Productadd.css";
import Mapcontainer from "../components/map/Mapcontainer";

const ProductAdd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  // 추가된 코드: 거래 방식 상태 관리
  const [transactionMethod, setTransactionMethod] = useState("판매하기");
  const [acceptPriceSuggestion, setAcceptPriceSuggestion] = useState(false);

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

  const handleSubmit = () => {
    const productData = {
      title,
      price: transactionMethod === "판매하기" ? price : "나눔",
      description,
      location,
      images,
      representativeImage: representativeIndex !== null ? images[representativeIndex] : null,
      transactionMethod,
      acceptPriceSuggestion,
    };

    console.log("Product Data:", productData);
    navigate("/productpage", { state: productData });
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
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
              >대표설정</button>
            </div>
          ))}
        </div>
      </section>
  
      {/* Product Details Form Section */}
      <form className="product-add-form">
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
  
        {/* Transaction Method Section */}
        <div className="transaction-method">
          <h2>거래 방식</h2>
          <div className="transaction-method-buttons">
            <button
              type="button"
              className={transactionMethod === "판매하기" ? "selected" : ""}
              onClick={() => setTransactionMethod("판매하기")}
            >
              판매하기
            </button>
            <button
              type="button"
              className={transactionMethod === "나눔하기" ? "selected" : ""}
              onClick={() => setTransactionMethod("나눔하기")}
            >
              나눔하기
            </button>
          </div>
        </div>
  
        {/* Price Input */}
        {transactionMethod === "판매하기" && (
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
    <div className="accept-price-suggestion">
      <input
        type="checkbox"
        checked={acceptPriceSuggestion}
        onChange={(e) => setAcceptPriceSuggestion(e.target.checked)}
      />
      가격 제안 받기
    </div>
  </div>
)}

  
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
            value={location}
            onClick={() => setShowMap(true)}
            placeholder="위치 추가"
            readOnly
            className="form-input"
          />
        </label>
      </form>
  
      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit}>작성 완료</button>
  
      {/* Map Modal */}
      {showMap && <Mapcontainer onClose={() => setShowMap(false)} onLocationSelect={handleLocationSelect} />}
    </div>
  );
}

export default ProductAdd;
