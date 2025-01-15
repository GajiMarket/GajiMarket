import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Productlistpage.css";
import Footer from "../components/all/Footer";

// Product 타입 정의
interface Product {
  product_id: number;
  title: string;
  sell_price: number;
  created_at: string;
  view_count: number;
}

const ProductList: React.FC = () => {

  const navigate = useNavigate();
  // 상태 관리
  const [products, setProducts] = useState<Product[]>([]);
  const api = 'http://localhost:3000';

  // 백엔드 API 호출
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api}/product/list`);

        // API 응답 데이터 확인
        console.log("Fetched products from API:", response.data);

        if (response.data && response.data.success) {
          const productData = response.data.data ?? [];
          setProducts(productData);

          const productId: number = response.data.data.products.product_id;
        } else {
          console.error("API 응답이 성공하지 않았습니다.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios 에러 메시지:", error.response?.data);
        }
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = (productAdr: number) => {

    navigate(`/productpage/${productAdr}`);
  }


  // 화면에 출력
  return (
    <>
      <div className="product-list-container">
        <header className="product-list-header">
          <h1>가산동</h1>
          <button className="dropdown-button">▼</button>
        </header>
        <ul className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.product_id} className="product-item">
                <h2 className="product-title" onClick={() => handleNavigate(product.product_id)}>{product.title}</h2>
                <p className="product-meta">{product.sell_price}원</p>
                <p className="product-meta">{product.view_count} views</p>
                <button className="chat-button">채팅하기</button>
              </li>
            ))
          ) : (
            <p className="no-products">제품 목록이 없습니다.</p>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
