import React from 'react';
import "../../style/Chatlist.css";

interface Chat {
  chat_room_id: number;
  last_message: string;
  last_message_time: string;
  name: string;
  location: string;
  avatar: string; // 추가
  time: string; // 추가
}

interface ChatlistFormProps {
  chats: Chat[];
  onChatClick: (chatRoomId: number, chatName: string) => void;
}

const ChatlistForm: React.FC<ChatlistFormProps> = ({ chats, onChatClick }) => {
  if (!Array.isArray(chats) || chats.length === 0) {
    return <div className="no-chats">대화가 없습니다.</div>;
  }

  return (
    <div className="chatlist-form">
      {chats.map((chat) => (
        <div key={chat.chat_room_id} className="chatlist-item" onClick={() => onChatClick(chat.chat_room_id, chat.name)}>
          <img src={chat.avatar} alt={`${chat.name} 프로필`} className="chatlist-avatar" />
          <div className="chatlist-info">
            <div className="chatlist-Form-header">
              <p className="chatlist-name">{chat.name}</p>
              <p className="chatlist-location">{chat.location}</p>
              <p className="chatlist-point">ㆍ</p>
              <p className="chatlist-time">{chat.last_message_time}</p>
            </div>
            <div className="chatlist-message">{chat.last_message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatlistForm;