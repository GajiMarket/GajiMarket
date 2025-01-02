import React from 'react'
import "../../style/Chatpage.css"

interface ChatMessage {
  id: number
  sender: 'buyer' | 'seller'
  message: string
  timestamp: string
  image?: string
}

const Chatting:React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
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
                {msg.image && <img src={msg.image} alt="첨부 이미지" className="chat-image" />}
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