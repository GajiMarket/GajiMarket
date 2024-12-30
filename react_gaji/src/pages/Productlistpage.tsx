import React from "react";
import "../style/Productlistpage.css";

interface Product {
  id: number;
  title: string;
  location: string;
  distance: string;
  time: string;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "패딩팔아요~~",
      location: "가산동",
      distance: "4.5km",
      time: "10분전",
      imageUrl: "/path/to/image1.jpg",
    },
    {
      id: 2,
      title: "패딩팔아요~~",
      location: "가산동",
      distance: "4.5km",
      time: "10분전",
      imageUrl: "/path/to/image2.jpg",
    },
    // Add more products as needed
  ];

  return (
    <div className="product-list-container">
      <header className="product-list-header">
        <h1>가산동</h1>
        <button className="dropdown-button">▼</button>
      </header>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-image"
            />
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
  );
};

export default ProductList;
