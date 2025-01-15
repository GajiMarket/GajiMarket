import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Chatlist.css";
import ChatlistHeader from '../components/chatlist/ChatlistHeader';
import ChatlistForm from '../components/chatlist/ChatlistForm';
import Footer from '../components/all/Footer';
import { useNavigate } from 'react-router-dom';

const Chatlist: React.FC = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chatrooms/13'); // 13번 회원의 채팅 목록을 가져옴
        console.log('Fetched chats:', response.data); // 로그 추가
        setChats(response.data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

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