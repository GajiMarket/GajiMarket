import React from 'react'
import "../../style/Chatpage.css"

interface ChatProductProps {
  status: string;
  title: string;
  price: number;
  location: string;
}

const ChatProduct: React.FC<ChatProductProps> = ({ status, title, price, location }) => {

  return (
    <div className="chat-product">
      <img src="/path/to/image.jpg" alt="Product" className="chat-product-image" />
      <div className="chat-product-info">
        <div className="chat-product-header2">
          <p className="sell-reserv-end">{status}</p>
          <p className="chat-product-title">{title}</p>
        </div>
        <p className="chat-product-price">{price.toLocaleString()}원</p>
        <p className="chat-product-location">{location}</p>
      </div>
    </div>
  )
}

export default ChatProduct