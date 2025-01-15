import React from 'react'
import "../../style/Chatpage.css"

interface ChatMessage {
  id: number
  sender: 'buyer' | 'seller'
  message: string
  timestamp: string
  images?: string[]
}

const Chatting: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div className="chatting-container">대화가 없습니다.</div>;
  }

  // 채팅창 상단 중앙 날짜 표시
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // 채팅창 채팅글 옆 입력 시간 표시
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }

  let lastDate = '';

  return (
    <div className="chatting-container">
      {messages.map((msg) => {
        const currentDate = formatDate(msg.timestamp);
        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <React.Fragment key={msg.id}>
            {showDate && <div className="chat-time">{currentDate}</div>}
            <div className={`chat-bubble ${msg.sender}`}>
              <div className="chat-message">
                {msg.message}
                {/* 이미지 첨부시 1장씩 전송 */}
                {/* {msg.image && <img src={msg.image} alt="첨부 이미지" className="chat-image" />} */}
                {/* 이미지 첨부시 최대 10장씩 묶음 전송 */}
                {msg.images && (
                  <div className="chat-images-grid">
                    {msg.images.map((image, index) => (
                      <img key={index} src={image} alt="첨부 이미지" className="chat-image-grid-item" />
                    ))}
                  </div>
                )}
              </div>
              <div className="chat-timestamp">{formatTime(msg.timestamp)}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Chatting