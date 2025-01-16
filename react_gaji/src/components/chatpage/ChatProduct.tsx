import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatProductProps {
  productId: string;
}

interface Product {
  status: string;
  title: string;
  price: number;
  location: string;
}

const ChatProduct: React.FC<ChatProductProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product for productId: ${productId}`);
        const response = await axios.get(`http://localhost:3000/api/product/${productId}`);
        console.log('Fetched product:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="chat-product">
      <img src="/path/to/image.jpg" alt="Product" className="chat-product-image" />
      <div className="chat-product-info">
        <div className="chat-product-header2">
          <p className="sell-reserv-end">{product.status}</p>
          <p className="chat-product-title">{product.title}</p>
        </div>
        <p className="chat-product-price">{product.price.toLocaleString()}원</p>
        <p className="chat-product-location">{product.location}</p>
      </div>
    </div>
  );
};

export default ChatProduct;