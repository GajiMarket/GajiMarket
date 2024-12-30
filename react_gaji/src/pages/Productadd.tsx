// ProductAdd.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Productadd.css";

const ProductAdd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [representativeIndex, setRepresentativeIndex] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...uploadedFiles];

        // 대표 사진이 없으면 첫 번째 이미지를 대표로 설정
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
      price,
      description,
      location,
      images,
      representativeImage:
        representativeIndex !== null ? images[representativeIndex] : null,
    };
    // 여기에서 API 요청을 보냅니다
    console.log("Product Data:", productData);

    // 상품 등록 완료 후 상세 페이지로 리다이렉트
    navigate("/productpage", { state: productData });
  };

  return (
    <div className="product-add-container">
      <header className="product-add-header">
        <button className="product-add-back-button">⬅</button>
        <h1>내 물건 팔기</h1>
        <button className="product-add-save-draft">임시저장</button>
      </header>

      <div className="product-add-image-upload-section">
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
              <button
                className={`representative-badge ${
                  representativeIndex === index ? "active" : ""
                }`}
                onClick={() => handleSetRepresentative(index)}
              >
                {representativeIndex === index ? "대표사진" : "대표 설정"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="product-add-form-section">
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </label>
        <div className="categories">
          <button>디지털/가전</button>
          <button>게임기</button>
          <button>기타</button>
        </div>
        <label>
          가격
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력해주세요"
          />
        </label>
        <label>
          상품 상세설명
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="올릴 게시글 내용을 작성해주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)"
          />
        </label>
        <label>
          거래 희망 장소
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="장소선택"
          />
        </label>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        작성 완료
      </button>
    </div>
  );
};

export default ProductAdd;
