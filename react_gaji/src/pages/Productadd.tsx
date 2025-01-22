import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Productadd.css";
import Mapcontainer from "../components/map/Mapcontainer";
import axios from "axios";
import loginStore from "../utils/loginStore";

const server: string = import.meta.env.VITE_API_LOCAL;

const google: string = import.meta.env.VITE_GOOGLE_URL;

const ProductAdd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [sell_price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{
    lng: number;
    lat: number;
    name: string;
  } | null>(null);
  
  const [images, setImages] = useState<File[]>([]);

  const [showMap, setShowMap] = useState(false);

  // const [firstImage, setFirstImage] = useState<string>('');

  const { isAuthenticated, userNo } = loginStore();

  // const [product, setProduct] = useState<Record<string, string>>({
  //   title: '',
  //   sell_price: '',
  //   description: '',
  //   lng: '',
  //   lat: '',
  //   name: '',
  //   view: '',
  //   status: '판매중',
  //   userNo: userNo as string,
  // });

  const navigate = useNavigate();

  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
    navigate("/");
    return;
  }

  // const handleProduct = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setProduct({...product, [field]:e.target.value});
  // }


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files); // 업로드된 파일을 배열로 변환

      setImages((prevImages) => {
        const totalImages = prevImages.length + uploadedFiles.length;
        if (totalImages > 10) {
          alert("이미지는 최대 10개까지만 업로드할 수 있습니다.");
          return prevImages; // 기존 이미지 유지, 새 이미지는 추가하지 않음
        }
        return [...prevImages, ...uploadedFiles]; // 이미지 추가
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 상품 등록 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    // 필수 입력값 유효성 검사
    if (!title || !sell_price || !description || !location) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // const locationData = location
    //   ? { lng: location.lng, lat: location.lat }
    //   : null;



    // 서버로 전송할 상품 데이터 생성
    const productData = {
      title,
      sell_price, //Number(sell_price), // 문자열을 숫자로 변환
      description,
      location: location, //locationData,
      // createdAt: new Date().toISOString(), // 현재 시간
      // view_count: 0, // 조회수 초기화
      userNo: userNo,
      status: "판매중",
    };

    // const imageData = images.map((image, i) => {representativeIndex === 0&& `${Date.now()}_${}`})

    // const imagesData = imag

    const formData = new FormData();

    formData.append('productJSONData', JSON.stringify(productData));
    formData.append('title', productData.title);
    formData.append('sell_price', productData.sell_price);
    formData.append('description', productData.description);
    formData.append('location', JSON.stringify(productData.location));
    formData.append('userNo', productData.userNo as string);
    formData.append('status', productData.status);
    // formData.append('lng', String(productData.location.lng));
    // formData.append('lat', String(productData.location.lat));
    // formData.append('name', String(productData.location.name));
    // formData.append('views', String(productData.view_count));

    // formData.append('title', product.title as string);
    // formData.append('sell_price', product.sell_price as string);
    // formData.append('description', product.description as string);
    // formData.append('lng', product.lng as string);
    // formData.append('lat', product.lat as string);
    // formData.append('name', product.name as string);
    // formData.append('views', product.views as string);
    // formData.append('userNo', product.userNo as string);
    // formData.append('status', product.status as string);

// 300
// "설명"

// {lng: 126.88208551349072, lat: 37.48091521029353, name: "강남"}


    //이미지 저장
    // images.map((data, i) => {
    //   formData.append(`data_${i}`, data);
    // });

    console.log("forEach전 이미지:", images);
  
    
    // formData.append('image', image);

    images.forEach((image) => {
      formData.append('productImages', image);
      console.log("image 데이터:", image);
    })
    
    // formData.append('productImage', images);

    try {
      console.log("body data : ", productData);
      
      
      const response = await axios.post(
        import.meta.env.VITE_NODE_ENV === 'production' ? `${google}/use/productadd` : `${server}/use/productadd`,
        formData, 
      );

      // 상품 등록 성공 시 처리
      console.log("Product Saved:", response.data);
      alert("상품이 성공적으로 등록되었습니다.");

      // 입력 필드 초기화
      setTitle("");
      setPrice("");
      setDescription("");
      setLocation(null);
      setImages([]);

      // setProduct({});

      console.log("response.data.productId:", response.data.productId);

      // const imagesData = response.data.imagesData;
      const productId = response.data.productId

      // 상품 페이지로 이동
      navigate(`/productpage/${productId}`);
    } catch (error) {
      // 상품 등록 실패 시 처리
      console.error("Error saving product:", error);
      alert("상품 등록 중 문제가 발생했습니다.");
    }
  };

  const handleLocationSelect = (selectedLocation: {
    lng: number;
    lat: number;
    name: string;
  }) => {
    setLocation(selectedLocation);
    console.log("productadd_88줄", selectedLocation);
    setShowMap(false);
  };

  // 뒤로가기 버튼 이벤트 핸들러 추가
  const handleBackButtonClick = () => {
    if (window.history.length > 1) {
      navigate(-1); // 브라우저 히스토리 스택에서 뒤로 이동
    } else {
      navigate("/"); // 히스토리 스택이 없을 경우 메인 페이지로 이동
    }
  };

  return (
    <div className="product-add-container">
      {/* 헤더 섹션 */}
      <header className="product-add-header">
        <button
          className="product-add-back-button"
          onClick={handleBackButtonClick}
          aria-label="뒤로가기"
        >
          ← {/* 화살표 기호로 대체 */}
        </button>
        <h1>내 물건 팔기</h1>
        <button className="product-add-save-draft">임시저장</button>
      </header>

      <div className="product-add-content">
        <div className="product-add-content-top"></div>
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
                {/* 이미지 삭제 버튼 */}
                <button
                  className="product-image-remove-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  x
                </button>
                {/* 첫 번째 이미지에만 대표 이미지 뱃지 표시 */}
                {index === 0 && (
                  <span className="representative-badge">대표사진</span>
                )}
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
                value={sell_price}
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
        <div className="product-add-content-bottom"></div>
      </div>

      {/* 작성 완료 버튼 */}
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>
          작성 완료
        </button>
      </div>

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
