import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Productlistpage.css";
import Footer from "../components/all/Footer";

// Product 타입 정의
interface Product {
  id: number;
  title: string;
  location: string;
  distance: string;
  time: string;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  // 상태 관리
  const [products, setProducts] = useState<Product[]>([]);

  // 백엔드 API 호출
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="product-list-container">
        <header className="product-list-header">
          <h1>가산동</h1>
          <button className="dropdown-button">▼</button>
        </header>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.title} className="product-image" />
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-meta">
                  {product.distance} · {product.location} · {product.time}
                </p>
              </div>
              <button className="chat-button">채팅하기</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
