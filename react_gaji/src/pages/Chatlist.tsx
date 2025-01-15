import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Chatlist.css";
import ChatlistHeader from '../components/chatlist/ChatlistHeader';
import ChatlistForm from '../components/chatlist/ChatlistForm';
import Footer from '../components/all/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

interface Chat {
  chat_room_id: number;
  last_message: string;
  last_message_time: string;
  name: string;
  location: string;
  avatar: string;
  time: string;
}

const Chatlist: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const memberNo = searchParams.get('memberNo') || '13'; // 기본값으로 13번 회원 설정

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/chatrooms/${memberNo}`); // 회원 번호를 URL에 포함
        console.log('Fetched chats:', response.data); // 로그 추가
        setChats(response.data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, [memberNo]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setChats((prevChats) => {
        const updatedChats = prevChats.map(chat => {
          if (chat.chat_room_id === newMessage.chat_room_id) {
            return { ...chat, last_message: newMessage.chat_message, last_message_time: newMessage.created_at };
          }
          return chat;
        });
        return updatedChats;
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleChatClick = (chatRoomId: number, chatName: string) => {
    navigate(`/chatpage/${chatRoomId}?name=${encodeURIComponent(chatName)}`);
  };

  return (
    <div className="chatlist">
      <ChatlistHeader />
      <div className="chatlist-scroll-container">
        <ChatlistForm chats={chats} onChatClick={handleChatClick} />
      </div>
      <Footer />
    </div>
  );
};

export default Chatlist;