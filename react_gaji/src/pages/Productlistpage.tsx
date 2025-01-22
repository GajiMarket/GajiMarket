import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Productlistpage.css";
import Footer from "../components/all/Footer";

const server: string = import.meta.env.VITE_API_LOCAL;

const google: string = import.meta.env.VITE_GOOGLE_URL;

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
  const [products, setProducts] = useState<Product[]>([]);
  const api = import.meta.env.NODE_ENV === 'production' ? `${google}` : `${server}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api}/product/list`);
        if (response.data && response.data.success) {
          setProducts(response.data.data ?? []);
        } else {
          console.error("API 응답이 성공하지 않았습니다.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = (productAdr: number) => {
    navigate(`/productpage/${productAdr}`);
  };

  return (
    <>
      <div className="product-total">
        <header className="product-list-header">
          <div className="header-left">
            <h1 className="header-title">가산동</h1>
            <button className="dropdown-button">▼</button>
          </div>
        </header>
        <div className="product-list-container">
          <ul className="product-list">
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.product_id} className="product-item">
                  <div className="product-image">
                    <img
                      src={`https://via.placeholder.com/80`} // 이미지 경로 수정 필요
                      alt="상품 이미지"
                    />
                  </div>
                  <div className="product-info">
                    <h2
                      className="product-list-title"
                      onClick={() => handleNavigate(product.product_id)}
                    >
                      {product.title}
                    </h2>
                    <p className="product-meta">{product.sell_price}원</p>
                    <p className="product-meta">{product.view_count} views</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="no-products">제품 목록이 없습니다.</p>
            )}
          </ul>

        </div>
      </div>
      <Footer currentPage={1}/>
    </>
  );
};

export default ProductList;
