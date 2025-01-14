import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Productadd.css";
import Mapcontainer from "../components/map/Mapcontainer";
import axios from 'axios'

const ProductAdd: React.FC = () => {
  // 상태 변수 정의
  const [title, setTitle] = useState(""); // 제목 입력 상태
  const [price, setPrice] = useState(""); // 가격 입력 상태
  const [description, setDescription] = useState(""); // 상세 설명 입력 상태
  const [location, setLocation] = useState<{ lng: number; lat: number; name: string } | null>(null); // 위치 정보 상태
  const [images, setImages] = useState<File[]>([]); // 업로드된 이미지 상태
  const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null); // 대표 이미지 인덱스 상태
  const [showMap, setShowMap] = useState(false); // 지도 모달 표시 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 이미지 업로드 처리 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files); // 업로드된 파일을 배열로 변환

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...uploadedFiles];
        // 업로드된 이미지 중 첫 번째 이미지를 대표 이미지로 설정
        if (representativeIndex === null && updatedImages.length > 0) {
          setRepresentativeIndex(0);
        }
        return updatedImages;
      });
    }
  };

  // 대표 이미지 설정 함수c
  const handleSetRepresentative = (index: number) => {
    setRepresentativeIndex(index);
  };

  // 상품 등록 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    // 필수 입력값 유효성 검사
    if (!title || !price || !description || !location) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 토큰 확인 (로그인 여부 확인)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 서버로 전송할 상품 데이터 생성
    const productData = {
      title,
      price: Number(price), // 문자열을 숫자로 변환
      description,
      location,
      createdAt: new Date().toISOString(), // 현재 시간 저장
      views: 0, // 조회수 초기값 설정
    };

    try {
      // 서버로 상품 데이터 전송 (POST 요청)
      const response = await axios.post("http://localhost:3000/api/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      // 상품 등록 성공 시 처리
      console.log("Product Saved:", response.data);
      alert("상품이 성공적으로 등록되었습니다.");

      // 입력 필드 초기화
      setTitle("");
      setPrice("");
      setDescription("");
      setLocation(null);
      setImages([]);
      setRepresentativeIndex(null);

      // 상품 페이지로 이동
      navigate("/productpage", { state: response.data });
    } catch (error) {
      // 상품 등록 실패 시 처리
      console.error("Error saving product:", error);
      alert("상품 등록 중 문제가 발생했습니다.");
    }
  };

  // 지도에서 선택한 위치를 설정하는 함수
  const handleLocationSelect = (selectedLocation: { lng: number; lat: number; name: string }) => {
    setLocation(selectedLocation); // 선택한 위치 설정
    console.log(selectedLocation);

    setShowMap(false); // 지도 모달 닫기
  };

  return (
    <div className="product-add-container">
      {/* 헤더 섹션 */}
      <header className="product-add-header">
        <button className="product-add-back-button">뒤로가기</button>
        <h1>내 물건 팔기</h1>
        <button className="product-add-save-draft">임시저장</button>
      </header>

      {/* 이미지 업로드 섹션 */}
      <section className="product-add-image-upload">
        <div className="image-list-container">
          {/* 최대 10장의 이미지만 업로드 가능 */}
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
          {/* 업로드된 이미지 목록 */}
          {images.map((image, index) => (
            <div className="uploaded-image-wrapper" key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={`uploaded-${index}`}
                className="uploaded-image"
              />
              {/* 대표 이미지 뱃지 */}
              {representativeIndex === index && (
                <span className="representative-badge">대표사진</span>
              )}
              {/* 대표 이미지 설정 버튼 */}
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

      {/* 상품 상세 입력 폼 섹션 */}
      <form className="product-add-form" onSubmit={(e) => e.preventDefault()}>
        {/* 제목 입력 */}
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

        {/* 가격 입력 */}
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

        {/* 상세 설명 입력 */}
        <label className="form-label">
          상품 상세설명
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="올릴 게시글 내용을 작성해주세요."
            className="form-textarea"
          />
        </label>

        {/* 위치 입력 */}
        <label className="form-label">
          거래 희망 장소
          <input
            type="text"
            value={location ? `${location.name}` : ""}
            onClick={() => setShowMap(true)} // 클릭 시 지도 모달 열기
            placeholder="위치 추가"
            readOnly
            className="form-input"
          />
        </label>
      </form>

      {/* 작성 완료 버튼 */}
      <button className="submit-button" onClick={handleSubmit}>
        작성 완료
      </button>

      {/* 지도 모달 */}
      {showMap && (
        <Mapcontainer
          onClose={() => setShowMap(false)} // 닫기 버튼 클릭 시 모달 닫기
          onLocationSelect={handleLocationSelect} // 위치 선택 시 처리 함수 호출
        />
      )}
    </div>
  );
};

export default ProductAdd;
