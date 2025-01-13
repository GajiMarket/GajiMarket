import React from "react";
import useProductForm from "../../hooks/product/useProductForm";
import Mapcontainer from "../map/Mapcontainer";
import "../../style/Productadd.css";

const ProductForm: React.FC = () => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    description,
    setDescription,
    location,
    images,
    // setImages,
    representativeIndex,
    // setRepresentativeIndex,
    transactionMethod,
    setTransactionMethod,
    acceptPriceSuggestion,
    setAcceptPriceSuggestion,
    showMap,
    setShowMap,
    handleImageUpload,
    handleSetRepresentative,
    handleLocationSelect,
  } = useProductForm();

  return (
    <div className="product-add-container">
      <header className="product-add-header">
        <button className="product-add-back-button">뒤로가기</button>
        <h1>내 물건 팔기</h1>
        <button className="product-add-save-draft">임시저장</button>
      </header>

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
                style={{ display: representativeIndex === index ? "none" : "block" }}
              >
                대표설정
              </button>
            </div>
          ))}
        </div>
      </section>

      <form className="product-add-form">
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

        <label className="form-label">
          상품 상세설명
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="올릴 게시글 내용을 작성해주세요."
            className="form-textarea"
          />
        </label>

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

      <button className="submit-button" onClick={() => alert("작성 완료")}>작성 완료</button>

      {showMap && (
        <Mapcontainer
          onClose={() => setShowMap(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default ProductForm;
