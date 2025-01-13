import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../style/Chatlist.css";

interface ChatItem {
  id: number;
  name: string;
  location: string;
  time: string;
  message: string;
  avatar: string;
  chat_room_id: number;
  buyer_no: number;
  created_at: Date;
  member_no: number;
  product_id: number;
}

const ChatlistForm: React.FC<{ chats: ChatItem[] }> = ({ chats }) => {
  if (!Array.isArray(chats) || chats.length === 0) {
    return <div className="no-chats">대화가 없습니다.</div>;
  }

  const navigate = useNavigate();

  const handleChatClick = (id: number, name: string) => {
    navigate(`/chatpage/${id}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="chatlist-form">
      {chats.map((chat) => (
        <div key={chat.id} className="chatlist-item" onClick={() => handleChatClick(chat.id, chat.name)}>
          <img src={chat.avatar} alt={`${chat.name} 프로필`} className="chatlist-avatar" />
          <div className="chatlist-info">
            <div className="chatlist-Form-header">
              <p className="chatlist-name">{chat.name}</p>
              <p className="chatlist-location">{chat.location}</p>
              <p className="chatlist-point">ㆍ</p>
              <p className="chatlist-time">{chat.time}</p>
            </div>
            <div className="chatlist-message">{chat.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatlistForm;