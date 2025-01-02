import React from 'react'
import "../../style/Chatpage.css"

const ChatProduct:React.FC = () => {
  return (
    <div className="chat-product">
      <img src="/path/to/image.jpg" alt="Product" className="chat-product-image" />
      <div className="chat-product-info">
        <div className="chat-product-header2">
            <p className="sell-reserv-end">판매중</p>
            <p className="chat-product-title">파리에서 입은 패딩 팔아요 ~</p>
        </div>
        <p className="chat-product-price">96,000원</p>
        <p className="chat-product-location">판매자와 10M 거리에 있습니다</p>
      </div>
    </div>
  )
}

export default ChatProduct